export const TOGGLE_SIDEBAR = 'RA/TOGGLE_SIDEBAR';

export enum TypeKeys {
    TOGGLE_SIDEBAR = 'RA/TOGGLE_SIDEBAR',
    SET_SIDEBAR_VISIBILITY = 'RA/SET_SIDEBAR_VISIBILITY',
    REFRESH_VIEW = 'RA/REFRESH_VIEW',
}

export interface IToggleSidebar {
    type: TypeKeys.TOGGLE_SIDEBAR;
}

export const toggleSidebar = (): IToggleSidebar => ({
    type: TypeKeys.TOGGLE_SIDEBAR,
});

// export const SET_SIDEBAR_VISIBILITY = 'RA/SET_SIDEBAR_VISIBILITY';

export interface ISetSidebarVisibility {
    type: TypeKeys.SET_SIDEBAR_VISIBILITY;
    payload: boolean;
}

export const setSidebarVisibility = (isOpen: boolean): ISetSidebarVisibility => ({
    type: TypeKeys.SET_SIDEBAR_VISIBILITY,
    payload: isOpen,
});

// export const REFRESH_VIEW = 'RA/REFRESH_VIEW';

export interface IRefereshView {
    type: TypeKeys.REFRESH_VIEW,
}

export const refreshView = (): IRefereshView => ({
    type: TypeKeys.REFRESH_VIEW,
});
