import {isActive, isDisabled} from "./get-task";
import Component from "./component";
import flatpickr from "flatpickr";

export default class TaskEdit extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._repeatingDays = data.repeatingDays;
    this._color = data.color;
    this._favourite = data.favourite;
    this._archive = data.archive;
    this._element = null;
    this._unEdit = null;
    this._onDelete = null;
    this._onSubmit = null;
    this._state.isDate = false;
    this._state.isRepeated = false;
    this._onClick = this._onClick.bind(this);
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: new Date(),
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }
    };

    const taskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }
    this.update(newData);
  }

  _onClick() {
    if (typeof this._onDelete === `function`) {
      this._onDelete();
    }
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this.unbind();
    this._partialUpdate();
    this.bind();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  _unEditCardClick() {
    if (typeof this._unEdit === `function`) {
      this._unEdit();
    }
  }

  set unEdit(fn) {
    this._unEdit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  get template() {
    return `
    <article class="card card--edit card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">edit</button>
            <button type="button" class="card__btn card__btn--archive ${isDisabled(this._archive)}">archive</button>
            <button type="button" class="card__btn card__btn--favorites ${isDisabled(this._favourite)}">favorites</button>
          </div>
    
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
    
          <div class="card__textarea-wrap">
            <label>
              <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._title}</textarea>
            </label>
          </div>
    
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
                  </button>
      
                  <fieldset class="card__date-deadline" ${!this._state.isDate && `disabled`}>
                    <label class="card__input-deadline-wrap">
                      <input class="card__date" type="text" placeholder="23 September" name="date" />
                    </label>
      
                    <label class="card__input-deadline-wrap">
                      <input class="card__time" type="text" placeholder="11:15 PM" name="time" />
                    </label>
                  </fieldset>
      
                  <button class="card__repeat-toggle" type="button">
                    repeat: <span class="card__repeat-status">${this._state.isRepeated ? `yes` : `no`}</span>
                    </button>
        
                    <fieldset class="card__repeat-days" ${!this._state.isRepeated && `disabled`}>
                        <div class="card__repeat-days-inner">
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-mo-2"
                            name="repeat"
                            value="mo"
${isActive(this._repeatingDays.mo)}
                    />
                    <label class="card__repeat-day" for="repeat-mo-2"
                      >mo</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-tu-2"
                      name="repeat"
                      value="tu"
                      ${isActive(this._repeatingDays.tu)}

                    />
                    <label class="card__repeat-day" for="repeat-tu-2"
                      >tu</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-we-2"
                      name="repeat"
                      value="we"
                      ${isActive(this._repeatingDays.we)}

                    />
                    <label class="card__repeat-day" for="repeat-we-2"
                      >we</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-th-2"
                      name="repeat"
                      value="th"
                      ${isActive(this._repeatingDays.th)}

                    />
                    <label class="card__repeat-day" for="repeat-th-2"
                      >th</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-fr-2"
                      name="repeat"
                      value="fr"
                      ${isActive(this._repeatingDays.fr)}

                    />
                    <label class="card__repeat-day" for="repeat-fr-2"
                      >fr</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      name="repeat"
                      value="sa"
                      id="repeat-sa-2"
                      ${isActive(this._repeatingDays.sa)}

                    />
                    <label class="card__repeat-day" for="repeat-sa-2"
                      >sa</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-su-2"
                      name="repeat"
                      value="su"
                      ${isActive(this._repeatingDays.su)}
                    />
                    <label class="card__repeat-day" for="repeat-su-2"
                      >su</label
                    >
                  </div>
                </fieldset>
              </div>
    
              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${(Array.from(this._tags).map((tag) => (`
                    <span class="card__hashtag-inner">
                      <input type="hidden" name="hashtag" value="${tag}" class="card__hashtag-hidden-input" />
                      <button type="button" class="card__hashtag-name">#${tag}</button>
                      <button type="button" class="card__hashtag-delete">delete</button>
                    </span>`.trim()))).join(``)}
                </div>
    
                <label>
                  <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here" />
                </label>
              </div>
            </div>
    
            <label class="card__img-wrap card__img-wrap--empty">
              <input type="file" class="card__img-input visually-hidden" name="img" />
            </label>
    
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                <input
                        type="radio"
                        id="color-black-2"
                        class="card__color-input card__color-input--black visually-hidden"
                        name="color"
                        value="black"
                        ${isActive(this._color)}
                      />
                      <label
                        for="color-black-2"
                        class="card__color card__color--black"
                        >black</label
                      >
                      <input
                        type="radio"
                        id="color-yellow-2"
                        class="card__color-input card__color-input--yellow visually-hidden"
                        name="color"
                        value="yellow"
                        ${isActive(this._color)}
                      />
                      <label
                        for="color-yellow-2"
                        class="card__color card__color--yellow"
                        >yellow</label
                      >
                      <input
                        type="radio"
                        id="color-blue-2"
                        class="card__color-input card__color-input--blue visually-hidden"
                        name="color"
                        value="blue"
                        ${isActive(this._color)}
                      />
                      <label
                        for="color-blue-2"
                        class="card__color card__color--blue"
                        >blue</label
                      >
                      <input
                        type="radio"
                        id="color-green-2"
                        class="card__color-input card__color-input--green visually-hidden"
                        name="color"
                        value="green"
                        ${isActive(this._color)}
                      />
                      <label
                        for="color-green-2"
                        class="card__color card__color--green"
                        >green</label
                      >
                      <input
                        type="radio"
                        id="color-pink-2"
                        class="card__color-input card__color-input--pink visually-hidden"
                        name="color"
                        value="pink"
                        ${isActive(this._color)}
                      />
                      <label
                        for="color-pink-2"
                        class="card__color card__color--pink"
                        >pink</label
                      >
              </div>
            </div>
          </div>
    
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`.trim();
  }
  bind() {
    this._element.querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick.bind(this));
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._unEditCardClick.bind(this));
    this._element.querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, this._onChangeRepeated);
    this._element.querySelector(`.card__delete`)
      .addEventListener(`click`, this._onClick);

    if (this._state.isDate) {
      flatpickr(this._element.querySelector(`.card__date`), {altInput: true, altFormat: `j F`, dateFormat: `j F`});
      flatpickr(this._element.querySelector(`.card__time`), {enableTime: true, noCalendar: true, altInput: true, altFormat: `h:i K`, dateFormat: `h:i K`});
    }
  }

  unbind() {
    this._element.querySelector(`.card__form`)
      .removeEventListener(`click`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._unEditCardClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
      .removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
      .removeEventListener(`click`, this._onChangeRepeated);
    this._element.querySelector(`.card__delete`)
      .removeEventListener(`click`, this._onClick);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
  }

  static createMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => {
        target.title = value;
      },
      color: (value) => {
        target.color = value;
      },
      repeat: (value) => {
        target.repeatingDays[value] = true;
      },
      date: (value) => {
        target.dueDate = value;
      },
    };
  }

}
