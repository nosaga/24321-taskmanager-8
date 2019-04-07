import Component from "./component";

export default class Filters extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._number = data.number;
    this._checked = data.checked;
    this._disabled = data.disabled;
  }

  get template() {
    return `
      <div>
      <input
          type="radio"
          id="filter__${this._title}"
          class="filter__input visually-hidden"
          name="filter"
           ${this._checked ? `checked` : ``} ${this._disabled ? `disabled` : `  `}
        />
        <label for="filter__${this._title}" class="filter__label">
          ${this._title} <span class="filter__${this._title}-count">${this._number}</span></label
        >
    </div>`.trim();
  }
}
