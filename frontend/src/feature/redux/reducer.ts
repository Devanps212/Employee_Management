type Action = {
    payload: string
    type: string
}

const getToken = (): string | null => {
    try {
        const token = localStorage.getItem('token')
        return token ? token : null
    } catch (err) {
        console.error('Error fetching token from localStorage', err)
        return null
    }
}

export const initialState = {
    token: getToken()
}

export const SET_TOKEN = "SET_TOKEN"
export const REMOVE_TOKEN = "REMOVE_TOKEN"

export const authReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_TOKEN:
            localStorage.setItem('token', action.payload)
            return { ...state, token: action.payload }
        case REMOVE_TOKEN:
            localStorage.removeItem('token')
            return { ...state, token: null }
        default:
            return state
    }
}
