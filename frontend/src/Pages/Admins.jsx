import LeftSideMenu from "../Components/LeftSideMenu";
import ucf_logo from "../assets/ucf_logo.png";
import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";

export default function () {
  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    getAdmins();
    getUsers();
  }, []);

  return (
    <LeftSideMenu>
      <div className="flex mt-[3vh]">
        <img src={ucf_logo} className="w-16" />
        <div className="font-bold my-auto ml-5 text-3xl">Admins</div>
      </div>
      <div className="flex justify-center">
        <div className="mt-[10vh] max-h-[80vh] p-5 flex space-x-10">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3 tracking-wide"></th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 tracking-wide"
                  >
                    id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 tracking-wide"></th>
                </tr>
              </thead>
              <tbody>
                {admins.map((o, i) => (
                  <Row key={i} id={o.id} name={o.username} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5">
            {selected.length > 0 && (
              <div className="mb-5">
                <div className="font-bold mb-5">
                  Remove {selected.length} Selected Admins
                </div>
                <button
                  className="w-fit bg-red-500 rounded px-3 py-1 hover:opacity-50 text-white mb-5"
                  onClick={() => {
                    if (
                      confirm(
                        `Are you sure you want to remove ${selected.length} users as admins?`
                      )
                    ) {
                      removeAsAdmin(selected);
                      setSelected([]);
                    }
                  }}
                >
                  Remove
                </button>
              </div>
            )}
            <div className="font-bold mb-5">Add New Admin</div>
            <div className="flex">
              <Dropdown
                options={users.map((u) => u.username)}
                placeholder="Select a User"
                controlClassName="border rounded-lg shadow w-48"
                menuClassName="border-none rounded-lg shadow-lg w-fit w-full"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.value)}
              />

              <button
                className="w-fit bg-[#ffcc00] rounded px-3 py-1 hover:opacity-50 ml-3"
                onClick={() => {
                  // Make selected user admin
                  addAdmin(users.find((u) => u.username === selectedUser).id);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </LeftSideMenu>
  );

  function Row({ id, name }) {
    return (
      <tr>
        <td className="px-6 py-4">
          <input
            checked={selected.includes(id)}
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                setSelected([...selected, id]);
              } else {
                setSelected(selected.filter((s) => s !== id));
              }
            }}
          />
        </td>
        <td className="px-6 py-4 bg-gray-50">{id}</td>
        <td className="px-6 py-4">{name}</td>
      </tr>
    );
  }

  function getAdmins() {
    fetch(`${import.meta.env.VITE_API_URL}/admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAdmins(data);
        console.log(data);
      });
  }

  function getUsers() {
    fetch(`${import.meta.env.VITE_API_URL}/user/not-admin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }

  function addAdmin(id) {
    fetch(`${import.meta.env.VITE_API_URL}/admin/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setSelectedUser("");
      getAdmins();
      getUsers();
    });
  }

  function removeAsAdmin(selected) {
    selected.forEach(async (id) => {
      await fetch(`${import.meta.env.VITE_API_URL}/admin/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        getAdmins();
        getUsers();
      });
    });
  }
}
