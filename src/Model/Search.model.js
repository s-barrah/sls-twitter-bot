import Model from './Model.model';

/**
 * SearchModel
 *
 */
export default class SearchModel extends Model {
  /**
   * SearchModel constructor
   */
  constructor() {
    super();
    this.query = '';
    this.count = '';
    this.result_type = '';
    this.lang = '';
  }

  /**
   * Get Query
   * @return {string|*}
   */
  getQuery() {
    return this.query;
  }

  /**
   * Set Query
   * @param value string
   */
  setQuery(value: string) {
    this.query = value;
  }

  /**
   * Get Count
   * @return {string|*}
   */
  getCount() {
    return this.count;
  }

  /**
   * Set Count
   * @param value string
   */
  setCount(value: string) {
    this.count = value;
  }

  /**
   * Get Result Type
   * @return {string|*}
   */
  getResultType() {
    return this.result_type;
  }

  /**
   * Set Result Type
   * @param value string
   */
  setResultType(value: string) {
    this.result_type = value;
  }

  /**
   * Get Language
   * @return {string|*}
   */
  getLang() {
    return this.lang;
  }

  /**
   * Set Language
   * @param value string
   */
  setLang(value: string) {
    this.lang = value;
  }

  /**
   * Get Base entity mappings
   * @return {object}
   */
  getEntityMappings() {
    return {
      q: this.getQuery(),
      count: this.getCount(),
      result_type: this.getResultType(),
      lang: this.getLang(),
    };
  }

  /**
   * Hydrate the base model from a entity
   * @param entityDataValues object
   * @return {SearchModel}
   */
  hydrateFromEntity(entityDataValues) {
    this.instantiateFunctionWithDefinedValue('setQuery', entityDataValues.query);
    this.instantiateFunctionWithDefinedValue('setCount', entityDataValues.count);
    this.instantiateFunctionWithDefinedValue('setResultType', entityDataValues.result_type);
    this.instantiateFunctionWithDefinedValue('setLang', entityDataValues.lang);
    return this;
  }
}
