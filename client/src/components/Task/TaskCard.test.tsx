import { render, screen } from "@testing-library/react";
import TaskCard from "./TaskCard";
import { TaskPriorityEnum, TaskStatusEnum, TagsEnum } from "../../utils/enums";
import { MemoryRouter } from "react-router-dom";

test("renders TaskCard component correctly", async () => {
  const mock = jest.fn();

  const task = {
    _id: "123123",
    title: "My first task",
    description: "The is first desc",
    status: TaskStatusEnum.OnHold,
    priority: TaskPriorityEnum.Critical,
    createdDate: "2024-11-13T00:00:00Z",
    userId: "670e2621b4d73448023f93ba",
    tags: [TagsEnum.UxDesign],
  };

  render(
    <MemoryRouter>
      <TaskCard task={task} deleteFn={mock} />
    </MemoryRouter>
  );

  // Use findBy* for elements that might not render immediately
  const priority = await screen.findByRole("button", { name: /critical/i });
  const heading = await screen.findByRole("heading", {
    name: /My first task/i,
  });
  const description = await screen.findByText(/The is first desc/i);
  const tag = await screen.findByRole("button", { name: /ux design/i });
  const date = await screen.findByRole("button", { name: /13 Nov 2024/i });
  const deleteBtn = await screen.findByRole("button", { name: /delete/i });
  const editBtn = await screen.findByRole("button", { name: /edit/i });

  // Assertions
  expect(priority).toBeInTheDocument();
  expect(heading).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(tag).toBeInTheDocument();
  expect(date).toBeInTheDocument();
  expect(deleteBtn).toBeInTheDocument();
  expect(editBtn).toBeInTheDocument();
});
