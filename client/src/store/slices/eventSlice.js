import { createSlice } from '@reduxjs/toolkit';



const EVENT_SLICE_NAME = 'event';

const initialState = [
    {
        name: "This will be the name of the event",
        startDateTime: 1681991400,
        endDateTime: 1682164200,
        notifiDateTime: 1681991400,
        id: 0,
        user: {
            id: 1
        },
        entries: [
            {
                id: '0-0',
                text: "Gary",
                status: 'pending',
                user: {
                    id: 2
                },
            }
        ]
    },
    {
        name: "This will be the name of the event",
        startDateTime: 1682165593,
        endDateTime: 1687608000,
        notifiDateTime: 1682165593,
        id: 1,
        user: {
            id: 1
        },
        entries: []
    },
    {
        name: "This will be the name of the event",
        startDateTime: 1681906393,
        endDateTime: 1687435200,
        notifiDateTime: 1681906393,
        id: 2,
        user: {
            id: 1
        },
        entries: []
    },
    {
        name: "This will be the name of the event",
        startDateTime: 1687435200,
        endDateTime: 1682514060,
        notifiDateTime: 1681826222,
        id: 3,
        user: {
            id: 1
        },
        entries: [{
            id: '3-0',
            text: "Gary",
            status: 'pending',
            user: {
                id: 2
            },
        }]
    },
    {
        name: "This will be the name of the event",
        startDateTime: 1681909260,
        endDateTime: 1682254860,
        notifiDateTime: 1681909260,
        id: 4,
        user: {
            id: 1
        },
        entries: [
            {
                id: '4-0',
                text: "Gary",
                status: 'pending',
                user: {
                    id: 2
                },
            },
            {
                id: '4-1',
                text: "Poter",
                status: 'pending',
                user: {
                    id: 2
                },
            }
        ]
    },
    {
        name: "This will be the name of the event",
        startDateTime: 1683721933,
        endDateTime: 1688212800,
        notifiDateTime: 1682944333,
        id: 5,
        user: {
            id: 1
        },
        entries: [
            {
                id: '5-0',
                text: "Gary",
                status: 'pending',
                user: {
                    id: 2
                },
            }
        ]
    }
];

const reducers = {
    createEvent: (state, { payload }) => {
        state.push({
            name: payload.name,
            startDateTime: payload.startDateTime,
            endDateTime: payload.endDateTime,
            notifiDateTime: payload.notifiDateTime,
            id: state.length
        })
    },
    updateEvent: (state, { payload }) => {
        state.forEach((element, index) => {
            if (payload.eventId == element.id) {
                state[element.id].entries.push({
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
    updateStatusEvent: (state, { payload }) => {
        state[payload.eventId].entries[payload.entrieId.split('-')[1]].status =
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

export const { createEvent, clearEvent, updateEvent, updateStatusEvent } = actions;

export default reducer;