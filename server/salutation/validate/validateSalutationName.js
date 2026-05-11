export function validateSalutationName( salutationName )
{
  if ( !isSalutationNameObject( salutationName ))
  {
    return [ salutationName,
      {
        en: 'Salutation name should be an object',
        de: 'Der Anredename sollte ein Objekt sein',
      },
    ];
  }

  if (!isSalutationNameLangFilledString( salutationName.en ))
  {
    return [ salutationName,
      {
        en: 'Salutation name in English should be non-empty string',
        de: 'Der Anredename auf Englisch muss nicht-leerer String sein',
      },
    ];
  }

  if (!isSalutationNameLangFilledString( salutationName.de ))
  {
    return [ salutationName,
      {
        en: 'Salutation name in German should be non-empty string',
        de: 'Der Anredename auf Deutsch muss nicht-leerer String sein',
      },
    ];
  }

  return [ salutationName ];
}

function isSalutationNameObject( salutationName )
{
  return salutationName != null
    && salutationName.constructor === Object;
}

function isSalutationNameLangFilledString( salutationNameLang )
{
  return salutationNameLang != null
    && salutationNameLang.constructor === String
    && salutationNameLang !== '';
}
