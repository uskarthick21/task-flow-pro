import { render, screen, within } from "@testing-library/react";
import TaskCard from "./TaskCard";
import { TaskPriorityEnum, TaskStatusEnum, TagsEnum } from "../../utils/enums";
import { BrowserRouter } from "react-router-dom";

test("render task card component", () => {
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
    <BrowserRouter>
      <TaskCard task={task} deleteFn={mock} />
    </BrowserRouter>
  );

  const priority = screen.getByRole("button", { name: /critical/i });
  const heading = screen.getByRole("heading", { name: /My first task/i });
  const description = screen.getByText(/The is first desc/i);
  const tag = screen.getByRole("button", { name: /ux design/i });
  const date = screen.getByRole("button", { name: /13 Nov 2024/i });
  const deleteBtn = screen.getByRole("button", { name: /delete/i });
  const editBtn = screen.getByRole("button", { name: /edit/i });

  expect(priority).toBeInTheDocument();
  expect(heading).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(tag).toBeInTheDocument();
  expect(date).toBeInTheDocument();
  expect(deleteBtn).toBeInTheDocument();
  expect(editBtn).toBeInTheDocument();
});
