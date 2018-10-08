export interface TreeLanguage {
    ra: {
        tree: {
            drag_preview: string;
            root_target: string;
        }
    }
}

const TreeLanguageFrench: TreeLanguage = {
    ra: {
        tree: {
            drag_preview:
                'Nœud #%{id} |||| Nœud #%{id} contenant %{smart_count} enfants',
            root_target: 'Lâcher un nœud ici pour le remonter à la racine',
        },
    }    
}

module.exports = TreeLanguageFrench;