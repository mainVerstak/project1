handleKeydownDropdown = (e) ->
  if e.key == 'Escape'
    $this = $(@)
    $this.removeClass 'open'
    $this.find('.dropdown-multiselect-toggle').removeClass 'active'

handleFocusoutDropdown = (e) ->
  $this = $(@)
  $this.attr('tabindex', -1)
  $this.find('.dropdown-multiselect-menu').attr('tabindex', 0)
  $this.find('.dropdown-multiselect-menu-item').attr('tabindex', 0)

  if !$this.has(e.relatedTarget).length
    $this.removeClass 'open'
    $this.find('.dropdown-multiselect-toggle').removeClass 'active'

handleClickDropdownSelectButton = (e) ->
  e.preventDefault()
  e.stopPropagation()

  $(@).closest('.dropdown-multiselect').find('.dropdown-multiselect-menu').attr('tabindex', 0)
  $(@).closest('.dropdown-multiselect').find('.dropdown-multiselect-menu-item').attr('tabindex', 0)

  $(@).closest('.dropdown-multiselect').toggleClass 'open'
  $(@).toggleClass 'active'

# TODO: Переделать этот функицонал, по тому что он работает только в области видимости одной кнопки в меню и не видет других полей
handleClickDropdownSelectMenuBtn = (e) ->
  e.preventDefault()
  e.stopPropagation()

  $target = $(e.currentTarget)
  $input = $target.find('input')
  $dropdownSelectButtonText = $target.closest('.dropdown-multiselect').find('.dropdown-multiselect-toggle span')

  itemName = $target.text().trim()
  itemValue = $input.val()
  btnText = $dropdownSelectButtonText.text()
  selectValue = []
  selectName = []

  if $target.hasClass('active')
    selectValue = selectValue.filter((v) -> v != itemValue)
    selectName = selectName.filter((n) -> n != itemName)
    $target.removeClass('active')
  else
    selectValue.push itemValue
    selectName.push itemName
    $target.addClass('active')

  if selectName.length > 1
    $dropdownSelectButtonText.text "#{selectName[0]} +#{selectName.length - 1}"
    $dropdownSelectButtonText.addClass 'bold'
  else if selectName.length == 0
    $dropdownSelectButtonText.text btnText
    $dropdownSelectButtonText.removeClass 'bold'
  else
    $dropdownSelectButtonText.text selectName[0]
    $dropdownSelectButtonText.addClass 'bold'

$(document).on('keydown', '.dropdown-multiselect', handleKeydownDropdown)
$(document).on('focusout', '.dropdown-multiselect', handleFocusoutDropdown)
$(document).on('click', '.dropdown-multiselect-toggle', handleClickDropdownSelectButton)
$(document).on('click', '.dropdown-multiselect-menu-item', handleClickDropdownSelectMenuBtn)