// project imports
import { columns, columnsOrder, comments, items, profiles, userStory, userStoryOrder } from './kanban';
import {
    ADD_COLUMN,
    EDIT_COLUMN,
    DELETE_COLUMN,
    UPDATE_COLUMN_ORDER,
    UPDATE_COLUMN_ITEM_ORDER,
    DELETE_ITEM,
    SELECT_ITEM,
    ADD_ITEM,
    ADD_ITEM_COMMENT,
    EDIT_ITEM,
    ADD_STORY,
    EDIT_STORY,
    UPDATE_STORY_ORDER,
    UPDATE_STORY_ITEM_ORDER,
    ADD_STORY_COMMENT,
    DELETE_STORY
} from './actions';

const initialState = {
    columns,
    columnsOrder,
    comments,
    items,
    profiles,
    selectedItem: false,
    userStory,
    userStoryOrder
};

const kanbanReducer = (state = initialState, action) => {
    let newColumn;
    let currentColumn;
    let newUserStory;
    let currentStory;
    let newItems;
    let itemIds;

    switch (action.type) {
        case ADD_COLUMN:
            return {
                ...state,
                columns: [...state.columns, action.payload.column],
                columnsOrder: [...state.columnsOrder, action.payload.column.id]
            };
        case UPDATE_COLUMN_ORDER:
            return {
                ...state,
                columnsOrder: action.payload.columnsOrder
            };
        case EDIT_COLUMN:
            state.columns.splice(
                state.columns.findIndex((column) => column.id === action.payload.column.id),
                1,
                action.payload.column
            );

            return {
                ...state,
                columns: state.columns
            };
        case DELETE_COLUMN:
            state.columns.splice(
                state.columns.findIndex((column) => column.id === action.payload.columnId),
                1
            );

            state.columnsOrder.splice(
                state.columnsOrder.findIndex((columnId) => columnId === action.payload.columnId),
                1
            );

            return {
                ...state,
                columns: state.columns,
                columnsOrder: state.columnsOrder
            };
        case ADD_ITEM:
            if (action.payload.columnId !== '0') {
                newColumn = state.columns.map((column) => {
                    if (column.id === action.payload.columnId) {
                        return {
                            ...column,
                            itemIds: column.itemIds ? [...column.itemIds, action.payload.item.id] : [action.payload.item.id]
                        };
                    }
                    return column;
                });
            } else {
                newColumn = state.columns;
            }

            if (action.payload.storyId !== '0') {
                newUserStory = state.userStory.map((story) => {
                    if (story.id === action.payload.storyId) {
                        return { ...story, itemIds: story.itemIds ? [...story.itemIds, action.payload.item.id] : [action.payload.item.id] };
                    }
                    return story;
                });
            } else {
                newUserStory = state.userStory;
            }

            return {
                ...state,
                items: [...state.items, action.payload.item],
                columns: newColumn,
                userStory: newUserStory
            };
        case EDIT_ITEM:
            state.items.splice(
                state.items.findIndex((item) => item.id === action.payload.item.id),
                1,
                action.payload.item
            );

            newUserStory = state.userStory;
            if (action.payload.storyId) {
                currentStory = state.userStory.filter((story) => story.itemIds.filter((itemId) => itemId === action.payload.item.id)[0])[0];

                if (currentStory !== undefined && currentStory.id !== action.payload.storyId) {
                    newUserStory = state.userStory.map((story) => {
                        if (story.itemIds.filter((itemId) => itemId === action.payload.item.id)[0]) {
                            return {
                                ...story,
                                itemIds: story.itemIds.filter((itemId) => itemId !== action.payload.item.id)
                            };
                        }
                        if (story.id === action.payload.storyId) {
                            return {
                                ...story,
                                itemIds: story.itemIds ? [...story.itemIds, action.payload.item.id] : [action.payload.item.id]
                            };
                        }
                        return story;
                    });
                }

                if (currentStory === undefined) {
                    newUserStory = state.userStory.map((story) => {
                        if (story.id === action.payload.storyId) {
                            return {
                                ...story,
                                itemIds: story.itemIds ? [...story.itemIds, action.payload.item.id] : [action.payload.item.id]
                            };
                        }
                        return story;
                    });
                }
            }

            newColumn = state.columns;
            if (action.payload.columnId) {
                currentColumn = state.columns.filter(
                    (column) => column.itemIds.filter((itemId) => itemId === action.payload.item.id)[0]
                )[0];
                if (currentColumn !== undefined && currentColumn.id !== action.payload.columnId) {
                    newColumn = state.columns.map((column) => {
                        if (column.itemIds.filter((itemId) => itemId === action.payload.item.id)[0]) {
                            return {
                                ...column,
                                itemIds: column.itemIds.filter((itemId) => itemId !== action.payload.item.id)
                            };
                        }
                        if (column.id === action.payload.columnId) {
                            return {
                                ...column,
                                itemIds: column.itemIds ? [...column.itemIds, action.payload.item.id] : [action.payload.item.id]
                            };
                        }
                        return column;
                    });
                }

                if (currentColumn === undefined) {
                    newColumn = state.columns.map((column) => {
                        if (column.id === action.payload.columnId) {
                            return {
                                ...column,
                                itemIds: column.itemIds ? [...column.itemIds, action.payload.item.id] : [action.payload.item.id]
                            };
                        }
                        return column;
                    });
                }
            }

            return {
                ...state,
                items: state.items,
                columns: newColumn,
                userStory: newUserStory
            };
        case UPDATE_COLUMN_ITEM_ORDER:
            return {
                ...state,
                columns: action.payload.columns
            };
        case SELECT_ITEM:
            return {
                ...state,
                selectedItem: action.payload.selectedItem
            };
        case ADD_ITEM_COMMENT:
            newItems = state.items.map((item) => {
                if (item.id === action.payload.itemId) {
                    return {
                        ...item,
                        commentIds: item.commentIds ? [...item.commentIds, action.payload.comment.id] : [action.payload.comment.id]
                    };
                }
                return item;
            });

            return {
                ...state,
                items: newItems,
                comments: [...state.comments, action.payload.comment]
            };
        case DELETE_ITEM:
            newColumn = state.columns.map((column) => {
                itemIds = column.itemIds.filter((id) => id !== action.payload.itemId);
                return {
                    ...column,
                    itemIds
                };
            });

            newUserStory = state.userStory.map((story) => {
                itemIds = story.itemIds.filter((id) => id !== action.payload.itemId);
                return {
                    ...story,
                    itemIds
                };
            });

            state.items.splice(
                state.items.findIndex((item) => item.id === action.payload.itemId),
                1
            );

            return {
                ...state,
                items: state.items,
                columns: newColumn,
                userStory: newUserStory
            };
        case ADD_STORY:
            return {
                ...state,
                userStory: [...state.userStory, action.payload.story],
                userStoryOrder: [...state.userStoryOrder, action.payload.story.id]
            };
        case EDIT_STORY:
            state.userStory.splice(
                state.userStory.findIndex((story) => story.id === action.payload.story.id),
                1,
                action.payload.story
            );

            return {
                ...state,
                userStory: state.userStory
            };
        case UPDATE_STORY_ORDER:
            return {
                ...state,
                userStoryOrder: action.payload.userStoryOrder
            };
        case UPDATE_STORY_ITEM_ORDER:
            return {
                ...state,
                userStory: action.payload.userStory
            };
        case ADD_STORY_COMMENT:
            newUserStory = state.userStory.map((story) => {
                if (story.id === action.payload.storyId) {
                    return {
                        ...story,
                        commentIds: story.commentIds ? [...story.commentIds, action.payload.comment.id] : [action.payload.comment.id]
                    };
                }
                return story;
            });

            return {
                ...state,
                userStory: newUserStory,
                comments: [...state.comments, action.payload.comment]
            };
        case DELETE_STORY:
            state.userStory.splice(
                state.userStory.findIndex((story) => story.id === action.payload.storyId),
                1
            );

            state.userStoryOrder.splice(
                state.userStoryOrder.findIndex((storyId) => storyId === action.payload.storyId),
                1
            );

            return {
                ...state,
                userStory: state.userStory,
                userStoryOrder: state.userStoryOrder
            };
        default:
            return state;
    }
};

export default kanbanReducer;
