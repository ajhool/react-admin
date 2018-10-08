export interface TreeLanguage {
    ra: {
        tree: {
            drag_preview: string;
            root_target: string;
        }
    }
}

const TreeLanguageEnglish: TreeLanguage = {
    ra: {
        tree: {
            drag_preview:
                'Node #%{id} |||| Node #%{id} with %{smart_count} children',
            root_target: 'Drop an item here to make it top level',
        },
    },
}

module.exports = TreeLanguageEnglish;
