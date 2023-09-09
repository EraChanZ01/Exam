import { createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import {
    decorateAsyncThunk
} from '../../utils/store';

const SLICE_NAME = 'offers';

const initialState = {
    isFetching: true,
    error: null,
    data: [],
};

const reducers = {
    clearStore: state => {
        state.error = null;
        state.data = null;
    },
    clearAddOfferError: state => {
        state.error = null;
    },
};

export const getOffers = decorateAsyncThunk({
    key: `${SLICE_NAME}/getOffer`,
    thunk: async (payload) => {
        const { data } = await restController.getOffers(payload);
        return data;
    },
});

export const setOfferModerStatus = decorateAsyncThunk({
    key: `${SLICE_NAME}/setOfferModerStatus`,
    thunk: async payload => {
        const { data } = await restController.setOfferModerStatus(payload);
        return data;
    },
})

const extraReducers = builder => {
    builder.addCase(getOffers.fulfilled, (state, { payload }) => {
        state.isFetching = false
        state.data = [...state.data, ...payload]
        state.error = null;
    });
    builder.addCase(getOffers.rejected, (state, { payload }) => {
        state.error = payload;
    });
    builder.addCase(setOfferModerStatus.pending, (state, { payload }) => {
        state.isFetching = true;
    })
    builder.addCase(setOfferModerStatus.fulfilled, (state, { payload }) => {
        state.isFetching = false
        state.error = null
        state.data.forEach(offer => {
            if (offer.id === payload.offer.id) {
                return offer.status = payload.offer.status
            }
            return
        })
    })
    builder.addCase(setOfferModerStatus.rejected, (state, { payload }) => {
        state.error = payload;
    })
};


const offersSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers,
    extraReducers,
});

const { actions, reducer } = offersSlice;

export const { clearStore, clearAddOfferError } = actions;

export default reducer;

