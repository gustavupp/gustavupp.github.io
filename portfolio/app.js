//function to activate light mode
const modeIcon = document.getElementById('mode')
const switchMode = document.getElementById('switch')
const innerText = document.getElementById('inner-text')

modeIcon.onclick = function () {
  document.body.classList.toggle('light-mode')
  switchMode.classList.toggle('switch-active')
  innerText.classList.toggle('inner-text-active')
  if (document.body.classList.contains('light-mode')) {
    innerText.innerHTML = 'Dark'
  } else {
    innerText.innerHTML = 'Light'
  }
}

// function to activate the sidebar light mode
const modeIconSidebar = document.getElementById('mode-sidebar')
const switchModeSidebar = document.getElementById('switch-sidebar')
const innerTextSidebar = document.getElementById('inner-text-sidebar')

modeIconSidebar.onclick = function () {
  document.body.classList.toggle('light-mode')
  switchModeSidebar.classList.toggle('switch-active-sidebar')
  innerTextSidebar.classList.toggle('inner-text-active-sidebar')
  if (document.body.classList.contains('light-mode')) {
    innerTextSidebar.innerHTML = 'Dark'
  } else {
    innerTextSidebar.innerHTML = 'Light'
  }
}

//toggle sidebar
const sidebar = document.querySelector('.sidebar')
const toggleBtn = document.querySelector('.toggle-bars')
const navbar = document.querySelector('.navbar')

toggleBtn.addEventListener('click', function () {
  sidebar.classList.toggle('show-sidebar')
})

//close sidebar if window's inner width > 896px
window.addEventListener('resize', function () {
  if (window.innerWidth > 896) {
    sidebar.classList.remove('show-sidebar')
  }
})

//close sidebar when li is clicked
const sidebarUl = sidebar.querySelectorAll('li')

sidebarUl.forEach((li) =>
  li.addEventListener('click', function () {
    sidebar.classList.remove('show-sidebar')
  })
)

//get current year
const date = (document.getElementById('date').innerHTML =
  new Date().getFullYear())

//get position of TAGS when navbar fixed navbar
const scrollLinks = document.querySelectorAll('.scroll-links')

scrollLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()

    //get cliked link
    const elementId = e.currentTarget.getAttribute('href').slice(1)
    const element = document.getElementById(elementId)

    //get navbar height
    const navbarHeight = navbar.getBoundingClientRect().height

    //scroll to element height - navbar height
    window.scrollTo({
      top: element.offsetTop - navbarHeight,
    })
  })
})
