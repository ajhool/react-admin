export interface Language {
    ra: {
        action: {
            add_filter: string;
            add: string;
            back: string;
            bulk_actions: string;
            cancel: string;
            clear_input_value: string;
            clone: string;
            create: string;
            delete: string;
            edit: string;
            export: string;
            list: string;
            refresh: string;
            remove_filter: string;
            remove: string;
            save: string;
            search: string;
            show: string;
            sort: string;
            undo: string;
        },
        boolean: {
            true: string;
            false: string;
        },
        page: {
            create: string;
            dashboard: string;
            edit: string;
            error: string;
            list: string;
            loading: string;
            not_found: string;
            show: string;
        },
        input: {
            file: {
                upload_several: string; 
                upload_single: string;
            },
            image: {
                upload_several: string; 
                upload_single: string;
            },
            references: {
                all_missing: string;
                many_missing: string;
                single_missing: string;
            },
        },
        message: {
            about: string;
            are_you_sure: string;
            bulk_delete_content:
                string;
            bulk_delete_title:
                string;
            delete_content:
                string;
            delete_title: string;
            details: string;
            error:
                string;
            invalid_form: string;
            loading:
                string;
            no: string;
            not_found:
                string;
            yes: string;
        },
        navigation: {
            no_results: string;
            no_more_results: string;
            page_out_of_boundaries: string;
            page_out_from_end: string;
            page_out_from_begin: string;
            page_range_info: string;
            page_rows_per_page: string;
            next: string;
            prev: string;
        },
        auth: {
            user_menu: string;
            username: string;
            password: string;
            sign_in: string;
            sign_in_error: string;
            logout: string;
        },
        notification: {
            updated:
                string;
            created: string;
            deleted: string;
            bad_item: string;
            item_doesnt_exist: string;
            http_error: string;
            data_provider_error:
                string;
            canceled: string;
        },
        validation: {
            required: string;
            minLength: string;
            maxLength: string;
            minValue: string;
            maxValue: string;
            number: string;
            email: string;
            oneOf: string;
            regex: string;
        },
    },
}

const EnglishLanguage: Language = {
    ra: {
        action: {
            add_filter: 'Add filter',
            add: 'Add',
            back: 'Go Back',
            bulk_actions: '1 item selected |||| %{smart_count} items selected',
            cancel: 'Cancel',
            clear_input_value: 'Clear value',
            clone: 'Clone',
            create: 'Create',
            delete: 'Delete',
            edit: 'Edit',
            export: 'Export',
            list: 'List',
            refresh: 'Refresh',
            remove_filter: 'Remove this filter',
            remove: 'Remove',
            save: 'Save',
            search: 'Search',
            show: 'Show',
            sort: 'Sort',
            undo: 'Undo',
        },
        boolean: {
            true: 'Yes',
            false: 'No',
        },
        page: {
            create: 'Create %{name}',
            dashboard: 'Dashboard',
            edit: '%{name} #%{id}',
            error: 'Something went wrong',
            list: '%{name} List',
            loading: 'Loading',
            not_found: 'Not Found',
            show: '%{name} #%{id}',
        },
        input: {
            file: {
                upload_several:
                    'Drop some files to upload, or click to select one.',
                upload_single: 'Drop a file to upload, or click to select it.',
            },
            image: {
                upload_several:
                    'Drop some pictures to upload, or click to select one.',
                upload_single:
                    'Drop a picture to upload, or click to select it.',
            },
            references: {
                all_missing: 'Unable to find references data.',
                many_missing:
                    'At least one of the associated references no longer appears to be available.',
                single_missing:
                    'Associated reference no longer appears to be available.',
            },
        },
        message: {
            about: 'About',
            are_you_sure: 'Are you sure?',
            bulk_delete_content:
                'Are you sure you want to delete this %{name}? |||| Are you sure you want to delete these %{smart_count} items?',
            bulk_delete_title:
                'Delete %{name} |||| Delete %{smart_count} %{name} items',
            delete_content: 'Are you sure you want to delete this item?',
            delete_title: 'Delete %{name} #%{id}',
            details: 'Details',
            error:
                "A client error occurred and your request couldn't be completed.",
            invalid_form: 'The form is not valid. Please check for errors',
            loading: 'The page is loading, just a moment please',
            no: 'No',
            not_found:
                'Either you typed a wrong URL, or you followed a bad link.',
            yes: 'Yes',
        },
        navigation: {
            no_results: 'No results found',
            no_more_results:
                'The page number %{page} is out of boundaries. Try the previous page.',
            page_out_of_boundaries: 'Page number %{page} out of boundaries',
            page_out_from_end: 'Cannot go after last page',
            page_out_from_begin: 'Cannot go before page 1',
            page_range_info: '%{offsetBegin}-%{offsetEnd} of %{total}',
            page_rows_per_page: 'Rows per page:',
            next: 'Next',
            prev: 'Prev',
        },
        auth: {
            user_menu: 'Profile',
            username: 'Username',
            password: 'Password',
            sign_in: 'Sign in',
            sign_in_error: 'Authentication failed, please retry',
            logout: 'Logout',
        },
        notification: {
            updated: 'Element updated |||| %{smart_count} elements updated',
            created: 'Element created',
            deleted: 'Element deleted |||| %{smart_count} elements deleted',
            bad_item: 'Incorrect element',
            item_doesnt_exist: 'Element does not exist',
            http_error: 'Server communication error',
            data_provider_error:
                'dataProvider error. Check the console for details.',
            canceled: 'Action cancelled',
        },
        validation: {
            required: 'Required',
            minLength: 'Must be %{min} characters at least',
            maxLength: 'Must be %{max} characters or less',
            minValue: 'Must be at least %{min}',
            maxValue: 'Must be %{max} or less',
            number: 'Must be a number',
            email: 'Must be a valid email',
            oneOf: 'Must be one of: %{options}',
            regex: 'Must match a specific format (regexp): %{pattern}',
        },
    },
};


module.exports = EnglishLanguage;