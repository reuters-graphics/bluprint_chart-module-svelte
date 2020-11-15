import * as d3 from 'd3-selection';

import {
  ErrorDataType,
  ErrorDrawMethodUndefined,
  ErrorEmptySelector,
  ErrorPropsType,
  ErrorSelectorType
} from './errorClasses';

import { appendSelect } from 'd3-appendselect';
import merge from 'lodash/merge';

d3.selection.prototype.appendSelect = appendSelect;

/**
 * This is the base component for the chart module template.
 * It generally consists of a few Getter/Setter functions
 * for things like data and props, which can be validated
 * and return useful errors if not configured correctly by
 * your chart's users.
 */
class ChartComponent {
  constructor(selector, props, data) {
    this.selection(selector);
    this.props(props);
    this.data(data);
  }

  /**
   * Getter/setter for the DOM node your chart container will be drawn into.
   * @param  {String or Element} selector
   */
  selection(selector) {
    if (!selector) return this._selection;

    if (!(selector instanceof Element) && typeof selector !== 'string') {
      throw new ErrorSelectorType(this.constructor.name);
    }

    this._selection = d3.select(selector);
    if (this._selection.empty()) {
      throw new ErrorEmptySelector(this.constructor.name);
    }
    return this;
  }

  /**
   * Default props. This will be filled in the chart module.
   * @type {Object}
   */
  defaultProps = {}

  /**
   * Getter/setter for props object. This will be filled in the chart module.
   * @param  {Object} obj props
   */
  props(obj) {
    if (!obj) return this._props || this.defaultProps;

    if (!(obj instanceof Object)) {
      throw new ErrorPropsType(this.constructor.name);
    }

    this._props = merge(this._props || this.defaultProps, obj);
    return this;
  }

  /**
   * Default data, generally set to an empty array or object here, and
   * fill in with more data in the chart module.
   * @type {Array or Object}
   */
  defaultData = []

  /**
   * Getter/setter for chart data. You can add any custom validation
   * you want in this function to make sure you're getting passed the
   * right data structure!
   * @param  {Array or Object} data Array or Object data
   */
  data(data) {
    if (!data) return this._data || this.defaultData;

    // Check the data is the same type as defaultData, either
    // an Array or an Object.
    if (!(data instanceof this.defaultData.constructor)) {
      throw new ErrorDataType(this.constructor.name);
    }

    this._data = data;
    return this;
  }

  /**
   * If you need to add ADDITIONAL data for your chart, you can absolutely add
   * additional getter/setters! Below is an example you can uncomment and customize.
   *
   * In your chart's draw method you'd be able to access this data like this:
   * const geoData = this.geoData();
   * ... and the user will be able to set it like this:
   * chart.geoData([ ... ]);
   */
  // geoData(topojson) {
  //   // GETTER
  //   if (!topojson) return this._topojson;
  //
  //   // Validate your data here, maybe...
  //
  //   // SETTER
  //   this._topojson = topojson;
  //   return this;
  // }

  /**
   * This method should be overwritten in the chart module!
   */
  draw() {
    throw new ErrorDrawMethodUndefined(this.constructor.name);
  }
}

export default ChartComponent;
