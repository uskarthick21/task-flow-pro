import React from "react";
import { Link } from "react-router-dom";
import { TaskType } from "../../shared/types";

type taskParams = {
  task: TaskType | undefined;
  setSearchListWrapper: (value: boolean) => void;
  setSearchValue: (value: string) => void;
};

const SearchList = (props: taskParams) => {
  const { setSearchListWrapper, setSearchValue, task } = props;
  const handleClick = () => {
    setSearchListWrapper(false);
    setSearchValue("");
  };

  return (
    <div className="py-2">
      {task && (
        <Link
          onClick={handleClick}
          className="flex w-full"
          to={`/task/${task?._id}`}
        >
          {task?.title}
        </Link>
      )}
    </div>
  );
};

export default SearchList;
