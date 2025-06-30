export default {
  editor: {
    label: {
      en: 'Select',
      fr: 'Liste déroulante'
    },
    icon: 'menu',
    customStylePropertiesOrder: [
      'backgroundColor',
      'borderColor',
      'borderRadius',
      'borderWidth',
      'color',
      'fontSize',
      'fontWeight'
    ],
    customSettingsPropertiesOrder: [
      'variant',
      'size',
      'placeholder',
      'options',
      'disabled',
      'searchable',
      'searchPlaceholder',
      'noOptionsText',
      'valueKey',
      'labelKey'
    ]
  },
  properties: {
    variant: {
      label: {
        en: 'Variant',
        fr: 'Variante'
      },
      type: 'TextSelect',
      options: {
        options: [
          { value: 'default', label: { en: 'Default', fr: 'Par défaut' } },
          { value: 'outline', label: { en: 'Outline', fr: 'Contour' } },
          { value: 'ghost', label: { en: 'Ghost', fr: 'Fantôme' } }
        ]
      },
      defaultValue: 'default',
      bindable: true,
      section: 'settings'
    },
    size: {
      label: {
        en: 'Size',
        fr: 'Taille'
      },
      type: 'TextSelect',
      options: {
        options: [
          { value: 'sm', label: { en: 'Small', fr: 'Petit' } },
          { value: 'default', label: { en: 'Default', fr: 'Par défaut' } },
          { value: 'lg', label: { en: 'Large', fr: 'Grand' } }
        ]
      },
      defaultValue: 'default',
      bindable: true,
      section: 'settings'
    },
    placeholder: {
      label: {
        en: 'Placeholder',
        fr: 'Texte de placeholder'
      },
      type: 'Text',
      defaultValue: 'Select an option...',
      bindable: true,
      multiLang: true,
      section: 'settings'
    },
    options: {
      label: {
        en: 'Options',
        fr: 'Options'
      },
      type: 'Array',
      options: {
        item: {
          type: 'Object',
          options: {
            item: {
              label: {
                type: 'Text',
                options: {
                  placeholder: 'Option label'
                }
              },
              value: {
                type: 'Text',
                options: {
                  placeholder: 'Option value'
                }
              },
              disabled: {
                type: 'OnOff',
                defaultValue: false
              }
            }
          }
        }
      },
      defaultValue: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' }
      ],
      bindable: true,
      section: 'settings'
    },
    disabled: {
      label: {
        en: 'Disabled',
        fr: 'Désactivé'
      },
      type: 'OnOff',
      defaultValue: false,
      bindable: true,
      section: 'settings'
    },
    searchable: {
      label: {
        en: 'Searchable',
        fr: 'Recherchable'
      },
      type: 'OnOff',
      defaultValue: false,
      bindable: true,
      section: 'settings'
    },
    searchPlaceholder: {
      label: {
        en: 'Search placeholder',
        fr: 'Placeholder de recherche'
      },
      type: 'Text',
      defaultValue: 'Search...',
      bindable: true,
      multiLang: true,
      section: 'settings',
      hidden: content => !content.searchable
    },
    noOptionsText: {
      label: {
        en: 'No options text',
        fr: 'Texte aucune option'
      },
      type: 'Text',
      defaultValue: 'No options found.',
      bindable: true,
      multiLang: true,
      section: 'settings'
    },
    valueKey: {
      label: {
        en: 'Value key',
        fr: 'Clé de valeur'
      },
      type: 'Text',
      defaultValue: 'value',
      bindable: true,
      section: 'settings',
      options: {
        placeholder: 'value'
      }
    },
    labelKey: {
      label: {
        en: 'Label key',
        fr: 'Clé de libellé'
      },
      type: 'Text',
      defaultValue: 'label',
      bindable: true,
      section: 'settings',
      options: {
        placeholder: 'label'
      }
    },
    customClass: {
      label: {
        en: 'Custom CSS class',
        fr: 'Classe CSS personnalisée'
      },
      type: 'Text',
      bindable: true,
      section: 'style'
    },
    contentClass: {
      label: {
        en: 'Content CSS class',
        fr: 'Classe CSS du contenu'
      },
      type: 'Text',
      bindable: true,
      section: 'style'
    }
  },
  actions: [
    {
      label: {
        en: 'Open select',
        fr: 'Ouvrir la liste'
      },
      action: 'openSelect'
    },
    {
      label: {
        en: 'Close select',
        fr: 'Fermer la liste'
      },
      action: 'closeSelect'
    },
    {
      label: {
        en: 'Clear selection',
        fr: 'Vider la sélection'
      },
      action: 'clearSelection'
    }
  ],
  triggerEvents: [
    {
      name: 'change',
      label: {
        en: 'On change',
        fr: 'Au changement'
      },
      event: {
        value: 'Selected value',
        option: 'Selected option object'
      }
    },
    {
      name: 'open',
      label: {
        en: 'On open',
        fr: 'À l\'ouverture'
      }
    },
    {
      name: 'close',
      label: {
        en: 'On close',
        fr: 'À la fermeture'
      }
    }
  ]
} 