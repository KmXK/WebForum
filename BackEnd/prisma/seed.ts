/* eslint-disable @typescript-eslint/no-non-null-assertion */
// noinspection ES6PreferShortImport

import { Message, PrismaClient, Section, Tag, Topic, User } from '@prisma/client';
import { MessageType, RoleType } from '../src/shared/enums';
import { PasswordHashingService } from '../src/common/password-hashing';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient({
    log: [
        {
            emit: 'stdout',
            level: 'query'
        }
    ]
});
const hashingService = new PasswordHashingService();

function randomGuid() {
    return faker.datatype.uuid();
}

function randomBoolean(probability: number): boolean {
    return faker.datatype.number({min: 0, max: 100}) >= probability;
}

function randomElement<T>(array: T[]): T {
    return array[faker.datatype.number({max: array.length - 1})];
}

function randomUntil<T>(func: () => T, condition: (value: T) => boolean) {
    let value: T;

    do {
        value = func();
    } while (condition(value));

    return value;
}

function randomElements<T>(array: T[], count: number): T[] {
    if (count >= array.length) {
        return array.filter(() => true);
    }

    const elements: T[] = [];

    for (let i = 0; i < count; i++) {
        elements.push(randomUntil(() => randomElement(array), t => elements.includes(t)));
    }

    return elements;
}

const users: Omit<Omit<User, 'passwordSalt'>, 'passwordHash'>[] = [
    {
        id: randomGuid(),
        login: 'admin',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: 'admin@email.com',
        roleId: RoleType.ADMIN,
        avatarUrl: null,
        refreshToken: null
    }
];

for (let i = 0; i < 1000; i++) {
    const {firstName, lastName} = randomUntil(() => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
    }), ({firstName, lastName}) => !!users.find(u => u.firstName === firstName && u.lastName === lastName));

    users.push({
        id: randomGuid(),
        login: faker.internet.userName(firstName, lastName),
        firstName: firstName,
        lastName: lastName,
        email: faker.internet.email(firstName, lastName),
        roleId: RoleType.USER,
        avatarUrl: null,
        refreshToken: null
    });
}

const rolesData = [
    {id: RoleType.USER, name: 'User'},
    {id: RoleType.MODERATOR, name: 'Moderator'},
    {id: RoleType.ADMIN, name: 'Admin'}
];

const sections: Section[] = [];
for (let i = 0; i < 50; i++) {
    sections.push({
        id: i,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraphs(2),
        authorId: randomElement(users).id,
        creationTime: faker.date.between('01/01/2023', Date.now()),
        parentSectionId: (sections.length > 0 && randomBoolean(80)) ? randomElement(sections).id : null
    });
}

const tags: Tag[] = [
    'Programming',
    'Cooking',
    'Funny',
    'Cars',
    'Food',
    'Traveling',
    'Underground',
    'Smartphones',
    'Apple',
    'Companies',
    'Stackoverflow'
].map((t, i) => ({
    id: i,
    name: t
}));

const topics: (Topic & { tags: Tag[] })[] = new Array(300).fill(0).map(() => {
    const section = randomElement(sections);

    return {
        id: randomGuid(),
        name: faker.lorem.sentence(),
        authorId: randomElement(users).id,
        closingTime: null,
        isImportant: randomBoolean(90),
        sectionId: section.id,
        creationTime: faker.date.between(section.creationTime, Date.now()),
        tags: randomElements(tags, faker.datatype.number({max: tags.length - 1}))
    };
});

const messageTypes = [
    {id: MessageType.Direct, name: 'Direct message'},
    {id: MessageType.Topic, name: 'Topic message'}
];

const topicMessages: ({ message: Message, topicId: string })[] = [];
const directMessages: ({ message: Message, recipientId: string })[] = [];

for (let i = 0; i < 1000; i++) {
    let parentMessageId: string | null = null;
    const senderId = randomElement(users).id;
    let creationTime: Date;
    let topic: Topic | undefined;
    let recipient: Omit<User, 'passwordHash' | 'passwordSalt'> | undefined;

    const isTopicMessage = randomBoolean(5);

    if (isTopicMessage) {
        topic = randomUntil(() => randomElement(topics), t => !!t.closingTime);

        creationTime = faker.date.between(topic.creationTime, Date.now());

        if (randomBoolean(99) && topics.filter(t => !t.closingTime).length > 100) {
            topic.closingTime = faker.date.between(creationTime, Date.now());
        }

        const existingTopicMessages = topicMessages.filter(m => m.topicId === topic!.id);

        if (randomBoolean(90) && existingTopicMessages.length > 0) {
            parentMessageId = randomElement(existingTopicMessages).message.id;
        }
    } else {
        recipient = randomUntil(() => randomElement(users), u => u.id === senderId);
        creationTime = faker.date.between('01/01/2023', Date.now());

        const existingDirectMessages = directMessages
            .filter(m => m.recipientId === recipient!.id && m.message.senderId === senderId);

        if (randomBoolean(90) && existingDirectMessages.length > 0) {
            parentMessageId = randomElement(existingDirectMessages).message.id;
        }
    }

    const message: Message = {
        id: randomGuid(),
        creationTime: creationTime,
        messageType: isTopicMessage ? MessageType.Topic : MessageType.Direct,
        isDeleted: randomBoolean(95),
        text: faker.lorem.text(),
        senderId: senderId,
        parentMessageId: parentMessageId
    };

    if (isTopicMessage) {
        // noinspection TypeScriptValidateTypes
        topicMessages.push({
            message: message,
            topicId: topic!.id
        });
    } else {
        // noinspection TypeScriptValidateTypes
        directMessages.push({
            message: message,
            recipientId: recipient!.id
        });
    }
}

async function main() {
    await prisma.$transaction([
        prisma.$executeRawUnsafe('EXEC sp_MSForEachTable "ALTER TABLE ? NOCHECK CONSTRAINT all"'),
        prisma.$executeRawUnsafe('EXEC sp_MSForEachTable "DELETE FROM ?"'),
        prisma.$executeRawUnsafe('EXEC sp_MSForEachTable "ALTER TABLE ? WITH CHECK CHECK CONSTRAINT all"')
    ]);

    await prisma.role.createMany({data: rolesData});

    await prisma.user.createMany({
        data: users.map(u => {
            const password = hashingService.hashPassword(u.login);
            return {
                ...u,
                passwordHash: password.hash,
                passwordSalt: password.salt
            };
        })
    });

    await prisma.tag.createMany({data: tags});
    await prisma.section.createMany({data: sections});
    await prisma.topic.createMany({
        data: topics.map(t => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {tags, ...topic} = t;
            return topic;
        })
    });
    await prisma.messageType.createMany({data: messageTypes});

    console.log(topics);

    await prisma.topicTag.createMany({
        data: topics.map(t => t.tags.map(tag => ({
            tagId: tag.id,
            topicId: t.id
        }))).flat()
    });

    await prisma.message.createMany({
        data: topicMessages.map(m => ({
            ...m.message
        }))
    });
    await prisma.message.createMany({
        data: directMessages.map(m => ({
            ...m.message
        }))
    });

    await prisma.topicMessage.createMany({
        data: topicMessages.map(m => ({
            id: m.message.id,
            messageType: m.message.messageType,
            topicId: m.topicId
        }))
    });

    await prisma.directMessage.createMany({
        data: directMessages.map(m => ({
            id: m.message.id,
            messageType: m.message.messageType,
            recipientId: m.recipientId
        }))
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
