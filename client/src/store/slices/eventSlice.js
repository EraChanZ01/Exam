import { createSlice } from '@reduxjs/toolkit';



const EVENT_SLICE_NAME = 'event';

const initialState = {
    events: [
        {
            name: "This will be the name of the event 1",
            startDateTime: 1681991400,
            endDateTime: 1682164200,
            notifiDateTime: 1681991400,
            id: 0,
            user: {
                id: 2
            },
            entries: [
                {
                    id: '0-0',
                    text: "Gary",
                    status: 'pending',
                    user: {
                        id: 1
                    },
                }
            ]
        },
        {
            name: "This will be the name of the event 2",
            startDateTime: 1694706123,
            endDateTime: 1694792523,
            notifiDateTime: 1684593661,
            id: 1,
            user: {
                id: 2
            },
            entries: []
        },
        {
            name: "This will be the name of the event 3",
            startDateTime: 1695214909,
            endDateTime: 1695474109,
            notifiDateTime: 1694792523,
            id: 2,
            user: {
                id: 2
            },
            entries: []
        },
        {
            name: "This will be the name of the event 4",
            startDateTime: 1694792523,
            endDateTime: 1694965323,
            notifiDateTime: 1681826222,
            id: 3,
            user: {
                id: 2
            },
            entries: [{
                id: '3-0',
                text: "Gary",
                status: 'pending',
                user: {
                    id: 1
                },
            }]
        },
        {
            name: "This will be the name of the event 5",
            startDateTime: 1681909260,
            endDateTime: 1695128509,
            notifiDateTime: 1681909260,
            id: 4,
            user: {
                id: 2
            },
            entries: [
                {
                    id: '4-0',
                    text: "Gary",
                    status: 'pending',
                    user: {
                        id: 1
                    },
                },
                {
                    id: '4-1',
                    text: "Poter",
                    status: "won",
                    user: {
                        id: 1
                    },
                }
            ]
        },
        {
            name: "This will be the name of the event 6",
            startDateTime: 1694782909,
            endDateTime: 1695118507,
            notifiDateTime: 1682944333,
            id: 5,
            user: {
                id: 2
            },
            entries: [
                {
                    id: '5-0',
                    text: "Gary",
                    status: "won",
                    user: {
                        id: 1
                    },
                }
            ]
        }
    ]
};

const reducers = {
    createEvent: (state, { payload }) => {
        state.events.push({
            name: payload.name,
            startDateTime: payload.startDateTime,
            endDateTime: payload.endDateTime,
            notifiDateTime: payload.notifiDateTime,
            id: state.length,
            user: payload.user,
            entries: []
        })
    },
    updateEvent: (state, { payload }) => {
        state.events.forEach((element, index) => {
            if (payload.eventId === element.id) {
                state.events[element.id].entries.push({
                    id: `${element.id}-${element.entries.length}`,
                    text: payload.text,
                    fileName: payload.fileName,
                    originalFileName: payload.originalFileName,
                    status: payload.status,
                    user: {
                        id: payload.creatorId
                    }
                })
            }
        });
    },
    sortEvent: (state) => {
        const timeNow = ~~(Date.now() / 1000)
        const newArray = [...state.events].sort((a, b) => {
            if (a.endDateTime < timeNow && b.endDateTime > timeNow) return 1
            if (a.startDateTime > timeNow && b.startDateTime < timeNow && b.endDateTime > timeNow) return 1
            if (a.endDateTime - timeNow > b.endDateTime - timeNow && b.startDateTime < timeNow && b.endDateTime > timeNow) return 1
            if (a.endDateTime - timeNow > b.endDateTime - timeNow && a.startDateTime > timeNow && b.startDateTime > timeNow) return 1
            else {
                return -1
            }
        })
        state.events = newArray
    },
    updateStatusEvent: (state, { payload }) => {
        state.events[payload.eventId].entries[payload.entrieId.split('-')[1]].status =
            payload.status === 'resolve' ? "won" : "rejected"
    },
    clearEvent: () => initialState,
};

const eventSlice = createSlice({
    name: EVENT_SLICE_NAME,
    initialState,
    reducers,
});

const { actions, reducer } = eventSlice;

export const { createEvent, clearEvent, updateEvent, updateStatusEvent, sortEvent } = actions;

export default reducer;