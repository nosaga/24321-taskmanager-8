export default (caption, count, checked = false) => `<input
          type="radio"
          id="filter__overdue"
          class="filter__input visually-hidden"
          name="filter"
          ${checked ? `checked` : ``}
        />
        <label for="filter__overdue" class="filter__label"
          >${caption} <span class="filter__overdue-count">${count}</span></label
        >`;
