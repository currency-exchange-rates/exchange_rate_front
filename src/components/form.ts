import {selectItem} from "./constants";

selectItem.addEventListener('change', function(evt) {
  this.classList.toggle('selected', !!this.value);
});