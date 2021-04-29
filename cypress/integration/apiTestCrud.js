describe("Use cypress react selector to test the form", () => {
	before(() => {
		it("should have the right initial state", function () {
			cy.window()
				.its("store")
				.invoke("getState")
				.its(apiState.apis)
				.should("be.empty");
		});
		cy.visit("http://localhost:3000/APIs");
		cy.waitForReact(1000, "#root");
		it("should have the right initial state", function () {
			cy.window()
				.its("store")
				.invoke("getState")
				.its(apiState.apis)
				.should("not.be.empty");
		});
	});

	var apis = [
		{
			name: "API " + Math.floor(Math.random() * 1000),
			ip: "127.0.0.1",
			port: Math.floor(Math.random() * 9999),
			description: "description",
		},
	];

	it("display all", () => {
		cy.wait(1000);
		cy.contains("Rows per page")
			.parent("div")
			.within(() => {
				cy.get(".MuiTablePagination-select").click();
			});
		cy.get(".MuiTablePagination-menuItem").eq(3).click();
	});

	it("create new API", () => {
		cy.wrap(apis).each((api) => {
			cy.contains("Add New").click();
			cy.react("TextField", { props: { field: { name: "name" } } }).type(
				api.name
			);
			cy.react("TextField", { props: { field: { name: "ip" } } }).type(api.ip);
			cy.react("TextField", { props: { field: { name: "port" } } }).type(
				api.port
			);
			cy.react("TextField", { props: { field: { name: "description" } } }).type(
				api.description
			);
			cy.get("#apiForm").should("not.be.disabled").submit();
			cy.wait(1000);
		});
	});

	it("search for API", () => {
		cy.wrap(apis).each((api) => {
			cy.get("#search").type(api.name);
		});
	});

	it("update the new IT Responsable", () => {
		cy.wrap(apis).each((api) => {
			cy.contains(api.name)
				.parents("tr")
				.within(() => {
					cy.get("td").eq(1).get("button").eq(2).click();
				});
			cy.react("TextField", { props: { field: { name: "name" } } }).clear();
			cy.react("TextField", { props: { field: { name: "ip" } } }).clear();
			cy.react("TextField", { props: { field: { name: "port" } } }).clear();
			cy.react("TextField", {
				props: { field: { name: "description" } },
			}).clear();

			cy.react("TextField", { props: { field: { name: "name" } } }).type(
				api.name + " updated"
			);
			cy.react("TextField", { props: { field: { name: "ip" } } }).type(
				"127.0.0.3"
			);
			cy.react("TextField", { props: { field: { name: "port" } } }).type(9999);
			cy.react("TextField", { props: { field: { name: "description" } } }).type(
				api.description + " updated"
			);
			cy.get("#apiForm").should("not.be.disabled").submit();
			cy.wait(1000);
		});
	});

	it("delete the new api", () => {
		cy.wrap(apis).each((api) => {
			cy.contains(api.name)
				.parents("tr")
				.within(() => {
					cy.get("td").eq(1).get("button").eq(3).click();
				});
		});
		cy.get(".MuiDialogActions-root").within(() => {
			cy.get("button").eq(1).click();
		});
	});

	it("clear search for API", () => {
		cy.get("#search").clear();
	});
});
