describe("Use cypress react selector to test the form", () => {
	before(() => {
		it("should have the right initial state", function () {
			cy.window()
				.its("store")
				.invoke("getState")
				.its(teamState.teams)
				.should("be.empty");
		});
		cy.visit("http://localhost:3000/Teams");
		cy.waitForReact(1000, "#root");
		it("should have the right initial state", function () {
			cy.window()
				.its("store")
				.invoke("getState")
				.its(teamState.teams)
				.should("not.be.empty");
		});
	});

	var teams = [{ name: "Team Test A" }];

	it("create new team", () => {
		cy.wrap(teams).each((team) => {
			cy.contains("Add New").click();
			cy.get("#name").type(team.name);
			cy.get("#teamForm").should("not.be.disabled").submit();
			cy.wait(1000);
		});
	});

	it("update the new team", () => {
		cy.wrap(teams).each((team) => {
			cy.contains(team.name)
				.parent("tr")
				.within(() => {
					cy.get("td").eq(2).get("button").eq(0).click();
				});
			cy.react("TextField", { props: { field: { name: "name" } } }).clear();
			cy.react("TextField", { props: { field: { name: "name" } } }).type(
				team.name + " updated"
			);
			cy.get("#teamForm").should("not.be.disabled").submit();
			cy.wait(1000);
		});
	});

	it("delete the new team", () => {
		cy.wrap(teams).each((team) => {
			cy.contains(team.name)
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
