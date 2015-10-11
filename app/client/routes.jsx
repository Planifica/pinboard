function renderPublicLayoutWith(component) {
  ReactLayout.render(C.PublicLayout, {
    header: <C.PublicHeader />,
    content: component
  })
}

function renderPrivateLayoutWith(component) {
  ReactLayout.render(C.MainLayout, {
    header: <C.MainHeader />,
    content: component,
    footer: <C.MainFooter />
  })
}

FlowRouter.route('/', {
  name: 'Landing',
  action() {
    renderPublicLayoutWith(<C.Landing />)
  }
})

FlowRouter.route('/login', {
  name: 'Login',
  action() {
    renderPublicLayoutWith(<C.UserLogin />)
  }
})

FlowRouter.route('/register', {
  name: 'Register',
  action() {
    renderPublicLayoutWith(<C.UserRegister />)
  }
})

FlowRouter.route('/boards/:boardId?', {
  name: 'Boards',
  action(params) {
    if (params.boardId) {
      renderPrivateLayoutWith(<C.Board />)
    } else {
      renderPrivateLayoutWith(<C.Boards />)
    }
  }
})
