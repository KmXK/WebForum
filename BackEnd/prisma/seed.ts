import { PrismaClient } from '@prisma/client'
import { v4 } from 'uuid';
import { hashPassword } from '../src/common/password-hashing';
import { RoleTypeModel } from './models/roleType.model';
import { MessageTypeModel } from './models/messageType.model';

const prisma = new PrismaClient()

function getGuid() {
    return v4();
}

const usersData = [
    {
        id: getGuid(),
        login: 'admin',
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@email.com',
        roleId: RoleTypeModel.ADMIN
    },
    {
        id: getGuid(),
        login: 'moderator',
        firstName: 'moderator',
        lastName: 'moderator',
        email: 'moderator@email.com',
        roleId: RoleTypeModel.MODERATOR
    },
    {
        id: getGuid(),
        login: 'kmx',
        firstName: 'Kirill',
        lastName: 'Guydo',
        email: 'kmx@email.com',
        roleId: RoleTypeModel.USER
    },
    {
        id: getGuid(),
        login: 'alex',
        firstName: 'Alexey',
        lastName: 'Bondar',
        email: 'alex@email.com',
        roleId: RoleTypeModel.USER
    }
]

const rolesData = [
    {id: RoleTypeModel.USER, name: 'User'},
    {id: RoleTypeModel.MODERATOR, name: 'Moderator'},
    {id: RoleTypeModel.ADMIN, name: 'Admin'}
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
    },
    {
        id: 2,
        name: 'C#',
        description: 'Section about .NET programming and C# language',
        authorId: usersData.find(u => u.login === 'admin')!.id,
        creationTime: new Date(Date.parse('03/20/2003 13:30:55.301')),
        parentSectionId: 0
    },
    {
        id: 3,
        name: 'Golang',
        description: 'Section about Golang programming language',
        authorId: usersData.find(u => u.login === 'admin')!.id,
        creationTime: new Date(Date.parse('03/20/2003 14:41:55.123')),
        parentSectionId: 0
    }
]

const topicsData = [
    {
        id: getGuid(),
        name: 'C#: What is the difference between First() and FirstOrDefault()?',
        creationTime: new Date(Date.parse('03/21/2003 16:41:55.123')),
        authorId: usersData.find(u => u.login === 'kmx')!.id,
        closingTime: null,
        isImportant: false,
        sectionId: 2
    },
    {
        id: getGuid(),
        name: 'Rules for C# section',
        creationTime: new Date(Date.parse('03/21/2003 00:41:55.111')),
        authorId: usersData.find(u => u.login === 'admin')!.id,
        closingTime: new Date(Date.parse('03/21/2003 17:01:13.123')),
        isImportant: true,
        sectionId: 2
    },
    {
        id: getGuid(),
        name: 'How to create beautiful cake for New Year Holiday?',
        creationTime: new Date(Date.parse('03/23/2003 01:41:55.111')),
        authorId: usersData.find(u => u.login === 'alex')!.id,
        closingTime: null,
        isImportant: false,
        sectionId: 1
    }
]

const messageTypesData = [
    {id: MessageTypeModel.Direct, name: 'Direct message'},
    {id: MessageTypeModel.Topic, name: 'Topic message'}
]

const messagesData = [
    {
        id: getGuid(),
        creationTime: new Date(Date.parse('03/21/2003 16:53:13.123')),
        messageType: MessageTypeModel.Topic,
        senderId: usersData.find(u => u.login === 'kmx')!.id,
        topicId: topicsData[0].id,
        isDeleted: false,
        text: `I cannot understand what is the difference between First() and FirstOrDefault()?`
    },
    {
        id: getGuid(),
        creationTime: new Date(Date.parse('03/21/2003 17:00:13.123')),
        messageType: MessageTypeModel.Topic,
        senderId: usersData.find(u => u.login === 'admin')!.id,
        parentMessageId: 0,
        topicId: topicsData[0].id,
        isDeleted: false,
        text: `
        There are next differences:
        - \`First()\` method throws exception if collection is empty.
        - \`FirstOrDefault()\` method returns null if collection is empty.
        - If collection's item type is value type, then \`FirstOrDefault()\` method returns \`Nullable<<Type>>\`,  where \`Type\` is the type of the collection's item
        `
    },
    {
        id: getGuid(),
        creationTime: new Date(Date.parse('03/21/2003 01:50:55.111')),
        messageType: MessageTypeModel.Topic,
        senderId: usersData.find(u => u.login === 'admin')!.id,
        topicId: topicsData[1].id,
        isDeleted: false,
        text: `
        ## Rules:
        1. Don't ask simple questions.
        2. Try to find question's answers before asking it.
        `
    },
    {
        id: getGuid(),
        creationTime: new Date(Date.parse('03/23/2003 03:41:55.111')),
        messageType: MessageTypeModel.Topic,
        senderId: usersData.find(u => u.login === 'alex')!.id,
        topicId: topicsData[2].id,
        isDeleted: false,
        text: 'Who knows how to bake a cool and beautiful cake for New year holidays???'
    }
]

async function main() {
    await prisma.topicMessage.deleteMany();
    await prisma.message.deleteMany();
    await prisma.messageType.deleteMany();
    await prisma.topic.deleteMany();
    await prisma.section.deleteMany();
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();
    await prisma.topic.deleteMany();

    await prisma.role.createMany({data: rolesData});

    await Promise.all(usersData.map(async u => {
        const password = hashPassword(u.login);
        return prisma.user.create({
            data: {
                ...u,
                passwordHash: password.hash,
                passwordSalt: password.salt
            }
        })
    }));

    await prisma.section.createMany({data: sectionsData});
    await prisma.topic.createMany({data: topicsData});
    await prisma.messageType.createMany({data: messageTypesData});

    await Promise.all(messagesData.map(async m => {
        const {topicId, ...pm} = m;
        await prisma.message.create({
            data: {
                ...pm,
                parentMessageId: (m.parentMessageId ? messagesData[m.parentMessageId].id : null),
                messageType: MessageTypeModel.Topic
            }
        });
        await prisma.topicMessage.create({
            data: {
                id: m.id,
                topicId
            }
        });
    }));

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
