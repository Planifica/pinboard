FlowRouter.route("/", {
    name: 'Landing',
    action(params) {
        renderPublicLayoutWith(<C.Landing />);
    }
});

FlowRouter.route("/login", {
    name: "Login",
    action(params) {
        renderPublicLayoutWith(<C.UserLogin />);
    }
});

FlowRouter.route("/register", {
    name: "Register",
    action(params) {
        renderPublicLayoutWith(<C.UserRegister />);
    }
});

function renderPublicLayoutWith(component) {
    ReactLayout.render(C.PublicLayout, {
        header: <C.PublicHeader />,
        content: component
    });
}

function renderMainLayoutWith(component) {
    ReactLayout.render(C.MainLayout, {
        header: <C.MainHeader />,
        content: component,
        footer: <C.MainFooter />
    });
}
