describe("Use cypress react selector to test the form", () => {
	before(() => {
		it("should have the right initial state", function () {
			cy.window()
				.its("store")
				.invoke("getState")
				.its(itResponsableState.itResponsables)
				.should("be.empty");
		});
		cy.visit("http://localhost:3000/It-Responsables");
		cy.waitForReact(1000, "#root");
		it("should have the right initial state", function () {
			cy.window()
				.its("store")
				.invoke("getState")
				.its(itResponsableState.itResponsables)
				.should("not.be.empty");
		});
	});

	var itResponsables = [
		{ name: "IT Responsable Test", email: "itresponsable@gmail.com" },
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

	it("create new IT Responsable", () => {
		cy.wrap(itResponsables).each((itResponsable) => {
			cy.contains("Add New").click();
			cy.react("TextField", { props: { field: { name: "name" } } }).clear();
			cy.react("TextField", { props: { field: { name: "email" } } }).clear();
			cy.react("TextField", { props: { field: { name: "name" } } }).type(
				itResponsable.name
			);
			cy.react("TextField", { props: { field: { name: "email" } } }).type(
				itResponsable.email
			);
			cy.get("#ItResponsableForm").should("not.be.disabled").submit();
			cy.wait(1000);
		});
	});

	it("search for IT Responsable", () => {
		cy.wrap(itResponsables).each((itResponsable) => {
			cy.get("#search").type(itResponsable.name);
		});
	});

	it("update the new IT Responsable", () => {
		cy.wrap(itResponsables).each((itResponsable) => {
			cy.contains(itResponsable.name)
				.parent("tr")
				.within(() => {
					cy.get("td").eq(2).get("button").eq(0).click();
				});
			cy.react("TextField", { props: { field: { name: "name" } } }).clear();
			cy.react("TextField", { props: { field: { name: "email" } } }).clear();
			cy.react("TextField", { props: { field: { name: "name" } } }).type(
				itResponsable.name + " updated"
			);
			cy.react("TextField", { props: { field: { name: "email" } } }).type(
				itResponsable.email
			);
			cy.get("#ItResponsableForm").should("not.be.disabled").submit();
			cy.wait(1000);
		});
	});

	it("delete the new IT Responsable", () => {
		cy.wrap(itResponsables).each((itResponsable) => {
			cy.contains(itResponsable.name)
				.parent("tr")
				.within(() => {
					cy.get("td").eq(2).get("button").eq(1).click();
				});
		});
		cy.get(".MuiDialogActions-root").within(() => {
			cy.get("button").eq(1).click();
		});
	});

	it("clear search for IT Responsable", () => {
		cy.get("#search").clear();
	});
});
