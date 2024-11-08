import { BaseModel } from 'pydantic';

export default class TranslationRequest extends BaseModel:
    source_lang: str
    dest_lang: str
    text: str