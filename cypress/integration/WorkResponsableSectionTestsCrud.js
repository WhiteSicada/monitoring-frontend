describe("Use cypress react selector to test the form", () => {
	before(() => {
		it("should have the right initial state", function () {
			cy.window()
				.its("store")
				.invoke("getState")
				.its(workResponsableState.workResponsables)
				.should("be.empty");
		});
		cy.visit("http://localhost:3000/Work-Responsables");
		cy.waitForReact(1000, "#root");
		it("should have the right initial state", function () {
			cy.window()
				.its("store")
				.invoke("getState")
				.its(workResponsableState.workResponsables)
				.should("not.be.empty");
		});
	});

	var workResponsables = [
		{ name: "Work Responsable Test", email: "workresponsable@gmail.com" },
	];

	it("create new Work Responsable", () => {
		cy.wrap(workResponsables).each((workResponsable) => {
			cy.contains("Add New").click();
			cy.get("#name").type(workResponsable.name);
			cy.get("#email").type(workResponsable.email);
			cy.get("#WorkResponsableForm").should("not.be.disabled").submit();
			cy.wait(1000);
		});
	});

	it("update the new Work Responsable", () => {
		cy.wrap(workResponsables).each((workResponsable) => {
			cy.contains(workResponsable.name)
				.parent("tr")
				.within(() => {
					cy.get("td").eq(2).get("button").eq(0).click();
				});
			cy.react("TextField", { props: { field: { name: "name" } } }).clear();
			cy.react("TextField", { props: { field: { name: "email" } } }).clear();
			cy.react("TextField", { props: { field: { name: "name" } } }).type(
				workResponsable.name + " updated"
			);
			cy.react("TextField", { props: { field: { name: "email" } } }).type(
				workResponsable.email
			);
			cy.get("#WorkResponsableForm").should("not.be.disabled").submit();
			cy.wait(1000);
		});
	});

	it("delete the new Work Responsable", () => {
		cy.wrap(workResponsables).each((workResponsable) => {
			cy.contains(workResponsable.name)
				.parent("tr")
				.within(() => {
					cy.get("td").eq(2).get("button").eq(1).click();
				});
		});
		cy.get(".MuiDialogActions-root").within(() => {
			cy.get("button").eq(1).click();
		});
	});
});
