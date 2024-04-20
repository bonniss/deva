function removeI18nMenu() {
  const menu = $('.menuhide');

  if (menu) {
    menu.parent().remove();
  }
}

removeI18nMenu();
