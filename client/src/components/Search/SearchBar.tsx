import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../../hooks/useDebounce";
import { searchTasks } from "../../config/api";
import SearchList from "./SearchList";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchListWrapper, setSearchListWrapper] = useState(false);
  const debouncedValue = useDebounce(searchValue, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setSearchListWrapper(true);
  };

  const { data: tasksList } = useQuery({
    queryKey: ["searchTasksData", debouncedValue],
    queryFn: () => searchTasks(debouncedValue),
    enabled: debouncedValue.length > 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="w-full max-w-screen-sm relative">
        <input
          type="text"
          placeholder="Search"
          onChange={handleChange}
          value={searchValue}
          className="w-full px-4 py-2 text-sm text-black border border-white-smoke rounded-lg focus:outline-none focus:ring focus:ring-gray-200"
        />
        {searchValue.length > 0 && searchListWrapper && (
          <div
            role="listbox"
            className="w-full absolute bg-white p-2 border rounded-lg"
          >
            {tasksList ? (
              tasksList.map((task) => (
                <SearchList
                  key={task._id}
                  task={task}
                  setSearchListWrapper={setSearchListWrapper}
                  setSearchValue={setSearchValue}
                />
              ))
            ) : (
              <>Task not found</>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
