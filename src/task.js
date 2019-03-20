import {isDisabled, isHidden} from "./get-task";
import {createElement} from "./create-element";
import {Component} from "./component";

export class Task extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._repeatingDays = data.repeatingDays;
    this._color = data.color;
    this._display = data.display;
    this._favourite = data.favourite;
    this._archive = data.archive;
    this._element = null;
    this._onEdit = null;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _onEditButtonClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `
    <article class="card card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive ${isDisabled(this._archive)}">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites ${isDisabled(this._favourite)}"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text" 
              >${this._title}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${this._dueDate !== Date.now() ? ` Yes` : ``}</span>
                </button>

                <fieldset class="card__date-deadline" disabled>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="September"
                      name="date"
                    />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__time"
                      type="text"
                      placeholder="11:15 PM"
                      name="time"
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">no</span>
                </button>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${[...this._tags].map((it) => `<span class="card__hashtag-inner">
                    <input
                      type="hidden"
                      name="hashtag"
                      value="repeat"
                      class="card__hashtag-hidden-input"
                    />
                    <button type="button" class="card__hashtag-name">
                       #${it}
                    </button>
                    <button type="button" class="card__hashtag-delete">
                      #${it}
                    </button>
                  </span>`).join(``)}
                </div>
                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>

            <label class="card__img-wrap ${isHidden(this._display)}">
              <input
                type="file"
                class="card__img-input visually-hidden"
                name="img"
              />
              <img
                src="${this._picture}"
                alt="task picture"
                class="card__img"
              />
            </label>

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
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  unbind() {
    this._element.querySelector(`.card__btn--edit`)
      .removeEventListener(`click`, this._onEditButtonClick);
  }
}
