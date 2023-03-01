// third-party
import { Chance } from 'chance';
import { add, set, sub } from 'date-fns';

const chance = new Chance();

// user profile data
const profileIds = {
    profile1: 'profile-1',
    profile2: 'profile-2',
    profile3: 'profile-3'
};

export const profiles = [
    {
        id: profileIds.profile1,
        avatar: 'avatar-3.png',
        name: 'Barney Thea',
        time: '2 min ago'
    },
    {
        id: profileIds.profile2,
        avatar: 'avatar-1.png',
        name: 'Maddison Wilber',
        time: '1 day ago'
    },
    {
        id: profileIds.profile3,
        avatar: 'avatar-2.png',
        name: 'John Doe',
        time: 'now'
    }
];

// task comment data
const commentIds = {
    comment1: 'comment-1',
    comment2: 'comment-2',
    comment3: 'comment-3',
    comment4: 'comment-4',
    comment5: 'comment-5'
};

export const comments = [
    {
        id: commentIds.comment1,
        comment: 'Comment 1',
        profileId: profileIds.profile1
    },
    {
        id: commentIds.comment2,
        comment: 'Comment 2',
        profileId: profileIds.profile2
    },
    {
        id: commentIds.comment3,
        comment: 'Comment 3',
        profileId: profileIds.profile3
    },
    {
        id: commentIds.comment4,
        comment: 'Comment 4',
        profileId: profileIds.profile2
    },
    {
        id: commentIds.comment5,
        comment: 'Comment 5',
        profileId: profileIds.profile3
    }
];

// items data
const itemIds = {
    item1: `${chance.integer({ min: 1000, max: 9999 })}`,
    item2: `${chance.integer({ min: 1000, max: 9999 })}`,
    item3: `${chance.integer({ min: 1000, max: 9999 })}`,
    item4: `${chance.integer({ min: 1000, max: 9999 })}`,
    item5: `${chance.integer({ min: 1000, max: 9999 })}`,
    item6: `${chance.integer({ min: 1000, max: 9999 })}`,
    item7: `${chance.integer({ min: 1000, max: 9999 })}`,
    item8: `${chance.integer({ min: 1000, max: 9999 })}`,
    item9: `${chance.integer({ min: 1000, max: 9999 })}`,
    item10: `${chance.integer({ min: 1000, max: 9999 })}`
};

export const items = [
    {
        assign: profileIds.profile1,
        commentIds: [commentIds.comment1],
        description: 'Content of item 1',
        dueDate: sub(new Date(), { days: 12 }),
        id: itemIds.item1,
        image: 'profile-back-1.png',
        priority: 'low',
        title: 'Online fees payment & instant announcements'
    },
    {
        assign: profileIds.profile2,
        commentIds: [commentIds.comment2, commentIds.comment5],
        description: 'Content of item 2',
        dueDate: sub(new Date(), { days: 18 }),
        id: itemIds.item2,
        image: false,
        priority: 'high',
        title: 'Creation and Maintenance of Inventory Objects'
    },
    {
        assign: profileIds.profile3,
        description: 'Content of item 3',
        dueDate: sub(new Date(), { days: 8 }),
        id: itemIds.item3,
        image: false,
        priority: 'low',
        title: 'Update React & TypeScript version'
    },
    {
        assign: profileIds.profile2,
        commentIds: [commentIds.comment4],
        description: 'Content of item 4',
        dueDate: sub(new Date(), { days: 6 }),
        id: itemIds.item4,
        image: 'profile-back-2.png',
        priority: 'low',
        title: 'Set allowing rules for trusted applications.'
    },
    {
        assign: profileIds.profile2,
        commentIds: [commentIds.comment1, commentIds.comment2, commentIds.comment5],
        description: 'Content of item 5',
        dueDate: sub(new Date(), { days: 9 }),
        id: itemIds.item5,
        image: 'profile-back-3.png',
        priority: 'medium',
        title: 'Managing Applications Launch Control'
    },
    {
        assign: profileIds.profile3,
        commentIds: [commentIds.comment3, commentIds.comment4],
        description: 'Content of item 6',
        dueDate: set(new Date(), { hours: 10, minutes: 30 }),
        id: itemIds.item6,
        image: false,
        priority: 'medium',
        title: 'Run codemods'
    },
    {
        assign: profileIds.profile1,
        description: 'Content of item 7',
        dueDate: add(new Date(), { days: 5 }),
        id: itemIds.item7,
        image: 'profile-back-4.png',
        priority: 'low',
        title: 'Purchase Requisitions, Adjustments, and Transfers.'
    },
    {
        assign: profileIds.profile1,
        description: 'Content of item 8',
        dueDate: add(new Date(), { days: 17 }),
        id: itemIds.item8,
        image: false,
        priority: 'low',
        title: 'Attendance checking & homework details'
    },
    {
        assign: profileIds.profile3,
        commentIds: [commentIds.comment3],
        description: 'Content of item 9',
        dueDate: add(new Date(), { days: 8 }),
        id: itemIds.item9,
        image: false,
        priority: 'high',
        title: 'Admission, Staff & Schedule management'
    },
    {
        assign: profileIds.profile2,
        commentIds: [commentIds.comment5],
        description: 'Content of item 10',
        dueDate: add(new Date(), { days: 12 }),
        id: itemIds.item10,
        image: false,
        priority: 'low',
        title: 'Handling breaking changes'
    }
];

// columns data
const columnIds = {
    column1: 'column-1',
    column2: 'column-2',
    column3: 'column-3',
    column4: 'column-4'
};

export const columns = [
    {
        id: columnIds.column1,
        title: 'New',
        itemIds: [itemIds.item1, itemIds.item8, itemIds.item9]
    },
    {
        id: columnIds.column2,
        title: 'Active',
        itemIds: [itemIds.item3, itemIds.item4, itemIds.item5]
    },
    {
        id: columnIds.column3,
        title: 'Resolved',
        itemIds: [itemIds.item2]
    },
    {
        id: columnIds.column4,
        title: 'Closed',
        itemIds: [itemIds.item6, itemIds.item7, itemIds.item10]
    }
];

export const columnsOrder = [columnIds.column1, columnIds.column2, columnIds.column3, columnIds.column4];

// user story data
const userStoryIds = {
    userStory1: `${chance.integer({ min: 1000, max: 9999 })}`,
    userStory2: `${chance.integer({ min: 1000, max: 9999 })}`,
    userStory3: `${chance.integer({ min: 1000, max: 9999 })}`,
    userStory4: `${chance.integer({ min: 1000, max: 9999 })}`
};

export const userStoryOrder = [userStoryIds.userStory1, userStoryIds.userStory2, userStoryIds.userStory3, userStoryIds.userStory4];

export const userStory = [
    {
        acceptance: '',
        assign: profileIds.profile2,
        columnId: columnIds.column4,
        commentIds: [commentIds.comment5],
        description: chance.sentence(),
        dueDate: add(new Date(), { days: 12 }),
        id: userStoryIds.userStory1,
        priority: 'low',
        title: 'School Management Backend',
        itemIds: [itemIds.item1, itemIds.item8, itemIds.item9]
    },
    {
        acceptance: chance.sentence(),
        assign: profileIds.profile3,
        columnId: columnIds.column1,
        commentIds: [commentIds.comment3],
        description: chance.sentence(),
        dueDate: add(new Date(), { days: 8 }),
        id: userStoryIds.userStory2,
        priority: 'high',
        title: 'Inventory Implementation & Design',
        itemIds: [itemIds.item2, itemIds.item7]
    },
    {
        acceptance: chance.sentence({ words: 10 }),
        assign: profileIds.profile3,
        columnId: columnIds.column4,
        commentIds: [commentIds.comment3, commentIds.comment4],
        description: chance.sentence(),
        dueDate: set(new Date(), { hours: 10, minutes: 30 }),
        id: userStoryIds.userStory3,
        priority: 'medium',
        title: 'Theme migration from v4 to v5',
        itemIds: [itemIds.item3, itemIds.item6, itemIds.item10]
    },
    {
        acceptance: chance.sentence({ words: 5 }),
        assign: profileIds.profile1,
        columnId: columnIds.column3,
        commentIds: [commentIds.comment4],
        description: chance.sentence(),
        dueDate: sub(new Date(), { days: 8 }),
        id: userStoryIds.userStory4,
        priority: 'low',
        title: 'Lunch Beauty Application',
        itemIds: [itemIds.item4, itemIds.item5]
    }
];
