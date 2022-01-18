//function to activate darkMode
const mode_icon = document.getElementById('mode')
const switch_Mode = document.getElementById('switch')
const inner_text = document.getElementById('inner-text')

mode_icon.onclick = function () {
  document.body.classList.toggle('light-mode')
  switch_Mode.classList.toggle('switch-active')
  inner_text.classList.toggle('Inner-text-active')
  if (document.body.classList.contains('light-mode')) {
    inner_text.innerHTML = 'Dark'
  } else {
    inner_text.innerHTML = 'Light'
  }
}

//toggle sidebar
const sidebar = document.querySelector('.sidebar')
const toggleBtn = document.querySelector('.toggle-bars')

toggleBtn.addEventListener('click', function () {
  sidebar.classList.toggle('show-sidebar')
})

//close sidebar if window's inner width > 896px
window.addEventListener('resize', function () {
  if (window.innerWidth > 896) sidebar.classList.remove('show-sidebar')
})

//close sidebar when li is clicked
const sidebarUl = sidebar.querySelectorAll('li')

sidebarUl.forEach((li) =>
  li.addEventListener('click', function () {
    sidebar.classList.remove('show-sidebar')
  })
)
