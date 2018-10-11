export const TOGGLE_SIDEBAR = 'RA/TOGGLE_SIDEBAR';

export enum UITypeKeys {
    TOGGLE_SIDEBAR = 'RA/TOGGLE_SIDEBAR',
    SET_SIDEBAR_VISIBILITY = 'RA/SET_SIDEBAR_VISIBILITY',
    REFRESH_VIEW = 'RA/REFRESH_VIEW',
}

export interface IToggleSidebar {
    type: UITypeKeys.TOGGLE_SIDEBAR;
}

export const toggleSidebar = (): IToggleSidebar => ({
    type: UITypeKeys.TOGGLE_SIDEBAR,
});

// export const SET_SIDEBAR_VISIBILITY = 'RA/SET_SIDEBAR_VISIBILITY';

export interface ISetSidebarVisibility {
    type: UITypeKeys.SET_SIDEBAR_VISIBILITY;
    payload: boolean;
}

export const setSidebarVisibility = (isOpen: boolean): ISetSidebarVisibility => ({
    type: UITypeKeys.SET_SIDEBAR_VISIBILITY,
    payload: isOpen,
});

// export const REFRESH_VIEW = 'RA/REFRESH_VIEW';

export interface IRefreshView {
    type: UITypeKeys.REFRESH_VIEW,
}

export const refreshView = (): IRefreshView => ({
    type: UITypeKeys.REFRESH_VIEW,
});

export type UIActions = IToggleSidebar | ISetSidebarVisibility | IRefreshView;
