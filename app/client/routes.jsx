FlowRouter.route("/", {
    name: 'Landing',
    subscriptions() {

    },
    action(params) {
        renderPublicLayoutWith(<C.Landing />);
    }
});

FlowRouter.route("/login", {
    name: "Login",
    subscriptions(params) {

    },
    action(params) {
        renderMainLayoutWith(<C.UserLogin />);
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
