// Generated by CoffeeScript 2.7.0
(function() {
  var handleClickDropdownSelectButton, handleClickDropdownSelectMenuBtn, handleFocusoutDropdown, handleKeydownDropdown;

  handleKeydownDropdown = function(e) {
    var $this;
    if (e.key === 'Escape') {
      $this = $(this);
      $this.removeClass('open');
      return $this.find('.dropdown-multiselect-toggle').removeClass('active');
    }
  };

  handleFocusoutDropdown = function(e) {
    var $this;
    $this = $(this);
    $this.attr('tabindex', -1);
    $this.find('.dropdown-multiselect-menu').attr('tabindex', 0);
    $this.find('.dropdown-multiselect-menu-item').attr('tabindex', 0);
    if (!$this.has(e.relatedTarget).length) {
      $this.removeClass('open');
      return $this.find('.dropdown-multiselect-toggle').removeClass('active');
    }
  };

  handleClickDropdownSelectButton = function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).closest('.dropdown-multiselect').find('.dropdown-multiselect-menu').attr('tabindex', 0);
    $(this).closest('.dropdown-multiselect').find('.dropdown-multiselect-menu-item').attr('tabindex', 0);
    $(this).closest('.dropdown-multiselect').toggleClass('open');
    return $(this).toggleClass('active');
  };

  handleClickDropdownSelectMenuBtn = function(e) {
    var $dropdownSelectButtonText, $input, $target, btnText, itemName, itemValue, selectName, selectValue;
    e.preventDefault();
    e.stopPropagation();
    $target = $(e.currentTarget);
    $input = $target.find('input');
    $dropdownSelectButtonText = $target.closest('.dropdown-multiselect').find('.dropdown-multiselect-toggle span');
    itemName = $target.text().trim();
    itemValue = $input.val();
    btnText = $dropdownSelectButtonText.text();
    selectValue = [];
    selectName = [];
    if ($target.hasClass('active')) {
      selectValue = selectValue.filter(function(v) {
        return v !== itemValue;
      });
      selectName = selectName.filter(function(n) {
        return n !== itemName;
      });
      $target.removeClass('active');
    } else {
      selectValue.push(itemValue);
      selectName.push(itemName);
      $target.addClass('active');
    }
    if (selectName.length > 1) {
      $dropdownSelectButtonText.text(`${selectName[0]} +${selectName.length - 1}`);
      return $dropdownSelectButtonText.addClass('bold');
    } else if (selectName.length === 0) {
      $dropdownSelectButtonText.text(btnText);
      return $dropdownSelectButtonText.removeClass('bold');
    } else {
      $dropdownSelectButtonText.text(selectName[0]);
      return $dropdownSelectButtonText.addClass('bold');
    }
  };

  $(document).on('keydown', '.dropdown-multiselect', handleKeydownDropdown);

  $(document).on('focusout', '.dropdown-multiselect', handleFocusoutDropdown);

  $(document).on('click', '.dropdown-multiselect-toggle', handleClickDropdownSelectButton);

  $(document).on('click', '.dropdown-multiselect-menu-item', handleClickDropdownSelectMenuBtn);

}).call(this);
