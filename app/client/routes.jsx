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

FlowRouter.route("/boards", {
    name: "Boards",
    action(params) {
        renderPrivateLayoutWith(<C.Boards />);
    }
});

function renderPublicLayoutWith(component) {
    ReactLayout.render(C.PublicLayout, {
        header: <C.PublicHeader />,
        content: component
    });
}

function renderPrivateLayoutWith(component) {
    ReactLayout.render(C.MainLayout, {
        header: <C.MainHeader />,
        content: component,
        footer: <C.MainFooter />
    });
}
