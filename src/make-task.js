import {getTaskType} from "./get-task";
import {cardColors} from "./get-task";
import {isActvieDay} from "./get-task";
import {isDisabled} from "./get-task";

export default (task) => getTaskType.map((card) => `<article class="card ${card}">
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--edit">
                    edit
                  </button>
                  <button type="button" class="card__btn card__btn--archive ${isDisabled(task.archive)}">
                    archive
                  </button>
                  <button
                    type="button"
                    class="card__btn card__btn--favorites ${isDisabled(task.favourite)}"
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
                    >${task.title}</textarea>
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">${task.dueDate !== Date.now() ? ` Yes` : ``}</span>
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

                      <fieldset class="card__repeat-days" disabled>
                        <div class="card__repeat-days-inner">
                          <input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-mo-2"
                            name="repeat"
                            value="mo"
                            ${isActvieDay(task.repeatingDays.mo)}
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
                            ${isActvieDay(task.repeatingDays.tu)}

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
                            ${isActvieDay(task.repeatingDays.we)}

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
                            ${isActvieDay(task.repeatingDays.th)}

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
                            ${isActvieDay(task.repeatingDays.fr)}

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
                            ${isActvieDay(task.repeatingDays.sa)}

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
                            ${isActvieDay(task.repeatingDays.su)}
                          />
                          <label class="card__repeat-day" for="repeat-su-2"
                            >su</label
                          >
                        </div>
                      </fieldset>
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                        ${[...task.tags].map((it) => `<span class="card__hashtag-inner">
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

                  <label class="card__img-wrap card__img-wrap--empty">
                    <input
                      type="file"
                      class="card__img-input visually-hidden"
                      name="img"
                    />
                    <img
                      src="${task.picture}"
                      alt="task picture"
                      class="card__img"
                    />
                  </label>

                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                    ${[...cardColors].map((color) => `
                      <input
                        type="radio"
                        id="color-${color}-2"
                        class="card__color-input card__color-input--${color} visually-hidden"
                        name="color"
                        value="${color}"
                        ${color === task.color ? `checked` : ``}
                      />
                      <label
                        for="color-${color}-2"
                        class="card__color card__color--${color}"
                        >${color}</label
                      >`).join(``)}
                    </div>
                  </div>
                </div>

                <div class="card__status-btns">
                  <button class="card__save" type="submit">save</button>
                  <button class="card__delete" type="button">delete</button>
                </div>
              </div>
            </form>
          </article>`).join(``);
