import React from 'react';
import CultivationGrimoire from './CultivationGrimoire.jsx';
import FieldManualSpread from './field-manual/FieldManualSpread.jsx';
import { FIELD_MANUAL_CHAPTERS, FIELD_MANUAL_ENTRIES, FIELD_MANUAL_VIEW_KEY, fieldManualEntryName } from './field-manual/book.js';
import './field-manual.css';

const FIELD_MANUAL_BOOK = Object.freeze({
  name: 'Field Manual',
  shortName: 'Field Manual',
  className: 'field-manual',
  chapters: FIELD_MANUAL_CHAPTERS,
  entries: FIELD_MANUAL_ENTRIES,
  entryName: fieldManualEntryName,
  Spread: FieldManualSpread,
  viewStorageKey: FIELD_MANUAL_VIEW_KEY,
  allowPreview: false,
});

export default function FieldManual(props) {
  return <CultivationGrimoire {...props} book={FIELD_MANUAL_BOOK}/>;
}

