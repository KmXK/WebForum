import { PrismaClient } from '@prisma/client'
import { v4 } from 'uuid';
import { hashPassword } from '../src/common/password-hashing';
import { RoleTypeModel } from './models/roleType.model';

const prisma = new PrismaClient()

function getGuid() {
    return v4();
}

const usersData = [
    {
        id: getGuid(),
        login: 'admin',
        email: 'admin@email.com',
        roleId: RoleTypeModel.ADMIN,
    },
    {
        id: getGuid(),
        login: 'moderator',
        email: 'moderator@email.com',
        roleId: RoleTypeModel.MODERATOR,
    },
    {
        id: getGuid(),
        login: 'kmx',
        email: 'kmx@email.com',
        roleId: RoleTypeModel.USER,
    },
    {
        id: getGuid(),
        login: 'alex',
        email: 'alex@email.com',
        roleId: RoleTypeModel.USER,
    },
]

const rolesData = [
    {id: RoleTypeModel.USER, name: 'User'},
    {id: RoleTypeModel.MODERATOR, name: 'Moderator'},
    {id: RoleTypeModel.ADMIN, name: 'Admin'},
];

const sectionsData = [
    {
        id: 0,
        name: 'Programming',
        description: 'Section about programming',
        authorId: usersData.find(u => u.login === 'admin')!.id,
        creationTime: new Date(Date.parse('03/20/2003 12:34:55.301'))
    },
    {
        id: 1,
        name: 'Cooking',
        description: 'Cool section about kitchen and yummy food',
        authorId: usersData.find(u => u.login === 'admin')!.id,
        creationTime: new Date(Date.parse('03/28/2003 17:32:12.111'))
    }
]


async function main() {
    await prisma.section.deleteMany();
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();
    const roles = await Promise.all(rolesData.map(r =>
        prisma.role.upsert({
            where: {id: r.id},
            update: {},
            create: {id: r.id, name: r.name}
        })));

    await prisma.user.deleteMany();
    const users = await Promise.all(usersData.map(async u => {
        const password = hashPassword(u.login);
        return prisma.user.upsert({
            where: {id: u.id},
            update: {},
            create: {
                ...u,
                passwordHash: password.hash,
                passwordSalt: password.salt
            }
        })
    }));

    await prisma.section.deleteMany();
    const sections = await Promise.all(sectionsData.map(s =>
        prisma.section.upsert({
            where: {id: s.id},
            update: {},
            create: {...s}
        })));
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })