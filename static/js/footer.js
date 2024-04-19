function removeProfileInBackgroundMode() {
  const el = $('#marker-to-remove-before-if-type-background');
  if (el) {
    const section = el.closest('section.prose');
    if (section) {
      section.prevAll().remove();
    }
    el.parent().remove();
  }
}

function removeI18nMenu() {
  const menu = $('.menuhide');

  if (menu) {
    menu.parent().remove();
  }
}

removeProfileInBackgroundMode();
removeI18nMenu();
