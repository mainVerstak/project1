$ ->
  # Find all dropdown multiselect elements
  $dropdownSelect = $('.dropdown-multiselect')
  
  # Process each dropdown
  $dropdownSelect.each ->
    $dropdown = $(this)
    selectValue = []
    selectName = []
    $dropdownButton = $dropdown.find('.dropdown-multiselect-toggle')
    $dropdownButtonText = $dropdown.find('.dropdown-multiselect-toggle span')
    $dropdownMenuItems = $dropdown.find('.dropdown-multiselect-menu-item')
    
    # Store the original button text
    btnText = $dropdownButtonText.text()
    
    # Handle escape key to close the dropdown
    $dropdown.on 'keydown', (e) ->
      if e.key is 'Escape'
        $dropdown.removeClass('open')
        $dropdownButton.removeClass('active')
    
    # Toggle dropdown on button click
    $dropdownButton.on 'click', (e) ->
      e.preventDefault()
      $dropdown.toggleClass('open')
      $dropdownButton.toggleClass('active')
    
    # Set tabindex for focusing
    $dropdown.attr('tabindex', '-1')
    
    # Handle clicks outside the dropdown to close it
    $(document).on 'click', (e) ->
      if !$(e.target).closest($dropdown).length && $dropdown.hasClass('open')
        $dropdown.removeClass('open')
        $dropdownButton.removeClass('active')
    
    # Prevent dropdown from closing when clicking inside it
    $dropdown.on 'click', (e) ->
      e.stopPropagation()
    
    # Handle clicks on menu items
    $dropdownMenuItems.on 'click', (e) ->
      e.preventDefault()
      e.stopPropagation() # Prevent event from bubbling up
      $this = $(this)
      $input = $this.find('input')
      itemText = $this.text()
      
      # Toggle active class on the clicked item
      $this.toggleClass('active')
      
      # Add/remove values based on selection state
      if $this.hasClass('active')
        # Add to arrays if selected
        selectName.push(itemText)
        selectValue.push($input.val()) if $input.length
      else
        # Remove from arrays if deselected
        selectValue = selectValue.filter (value) -> value isnt $input.val()
        selectName = selectName.filter (name) -> name isnt itemText
      
      # Set the data attribute with selected values
      $dropdown.data('value', selectValue)
      
      # Update button text based on selection count
      if selectName.length > 1
        $dropdownButtonText.text("#{selectName[0]} +#{selectName.length - 1}")
        $dropdownButtonText.addClass('bold')
      else if selectName.length is 0
        $dropdownButtonText.text(btnText)
        $dropdownButtonText.removeClass('bold')
      else
        $dropdownButtonText.text(selectName[0])
        $dropdownButtonText.addClass('bold') 