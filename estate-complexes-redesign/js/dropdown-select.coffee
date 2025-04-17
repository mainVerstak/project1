window.selectedValues = {}

updateSelectedText = ($target, values) ->
  $selectedText = $target.closest('.dropdown-multiselect').find('.dropdown-multiselect-title')

  if values.length > 0
    firstSelected = values[0]
    otherSelectedCount = values.length - 1

    if otherSelectedCount > 0
      $selectedText.text("#{firstSelected} +#{otherSelectedCount}")
      $selectedText.addClass 'bold'
    else
      $selectedText.text(firstSelected)
      $selectedText.addClass 'bold'
  else
    $selectedText.text($selectedText.data('title'))
    $selectedText.removeClass 'bold'

handleClickDropdownMultiselectToggle = (e) ->
  e.preventDefault()
  e.stopPropagation()

  $(e.target).closest('.dropdown-multiselect').toggleClass 'open'

handleClickDropdownMultiselectMenu = (e) ->
  $label = $(e.target)

  if $label
    $checkbox = $label.find('input[type="checkbox"]')
    $checkbox.prop 'checked', !$checkbox.is(':checked')
    $checkbox.trigger 'change'

handleChangeDropdownMultiselectMenu = (e) ->
  $target = $(e.target)
  window.selectedValues[$target.data('group-id')] = [] unless window.selectedValues[$target.data('group-id')]

  if $target && $target.attr('type') == 'checkbox'
    value = $target.data('name')

    if $target.is(':checked')
      window.selectedValues[$target.data('group-id')].push value
    else
      window.selectedValues[$target.data('group-id')] = window.selectedValues[$target.data('group-id')].filter((v) ->
        v != value
      )

    updateSelectedText($target, window.selectedValues[$target.data('group-id')])

handleClickDocument = (e) ->
  if $(e.target).closest('.dropdown-multiselect').length == 0
    $(document).find('.dropdown-multiselect').removeClass 'open'

$(document).on('click', '.dropdown-multiselect-toggle', handleClickDropdownMultiselectToggle)
$(document).on('click', '.dropdown-multiselect-menu-item', handleClickDropdownMultiselectMenu)
$(document).on('change', '.dropdown-multiselect-menu-item', handleChangeDropdownMultiselectMenu)
$(document).on('click', handleClickDocument)