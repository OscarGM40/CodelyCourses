import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createLocalStorageCourseRepository } from "../../../src/modules/courses/infrastructure/LocalStorageCourseRepository";
import { CoursesContextProvider } from "../../../src/sections/courses/CoursesContext";
import { CreateCourseForm } from "../../../src/sections/courses/CreateCourseForm";

describe("CreateCourseForm", () => {
	it("displays success message when data is correct", async () => {
		// fijate que no van a usar un mock,es la implementación al completo(solucion de compromiso aceptada por ellos,que trae acoplamiento)
		// NOTA: localStorage es sincrono,y jest-dom simula el localStorage perfectamente, incluye esa API
		const repository = createLocalStorageCourseRepository();
		render(
			<CoursesContextProvider repository={repository}>
				<CreateCourseForm />
			</CoursesContextProvider>
		);
		const titleInput = screen.getByLabelText(/title/i);
		userEvent.type(titleInput, "Awesome Hexagonal Arquitecture");

		const imageUrlInput = screen.getByLabelText(/image/i);
		userEvent.type(imageUrlInput, "http://placekitte.com/500/400");

		const submitButton = screen.getByText(/create course/i);

		userEvent.click(submitButton);

		const successMessage = await screen.findByRole("heading", { name: /Course created/i });
		expect(successMessage).toBeInTheDocument();
	});

	it("displays error message if title is too long", async () => {
		const repository = createLocalStorageCourseRepository();
		render(
			<CoursesContextProvider repository={repository}>
				<CreateCourseForm />
			</CoursesContextProvider>
		);
		const titleInput = screen.getByLabelText(/title/i);
		userEvent.type(titleInput, "Awesome Hexagonal Arquitecture ".repeat(30));

		const errorMessage = await screen.findAllByText("Title must be between 5 and 100 characters");

		expect(errorMessage).toBeInTheDocument();
	});

	it("displays error message if image url is not a valid url", async () => {
		const repository = createLocalStorageCourseRepository();
		render(
			<CoursesContextProvider repository={repository}>
				<CreateCourseForm />
			</CoursesContextProvider>
		);

		const imageUrlInput = screen.getByLabelText(/image/i);
		userEvent.type(imageUrlInput, "not a valid url");

		const errorMessage = await screen.findByText("Image url is not valid");

		expect(errorMessage).toBeInTheDocument();
	});
});
