import LeftSideMenu from "../Components/LeftSideMenu";
import ucf_logo from "../assets/ucf_logo.png";
import { useState } from "react";

export default function () {
  const [orgs, setOrgs] = useState([
    { id: 1, organization: "Lorem Ipsum" },
    { id: 2, organization: "Lorem Ipsum" },
    { id: 3, organization: "Lorem Ipsum" },
    { id: 4, organization: "Lorem Ipsum" },
    { id: 5, organization: "Lorem Ipsum" },
    { id: 6, organization: "Lorem Ipsum" },
    { id: 7, organization: "Lorem Ipsum" },
    { id: 8, organization: "Lorem Ipsum" },
    { id: 9, organization: "Lorem Ipsum" },
    { id: 10, organization: "Lorem Ipsum" },
  ]);
  const [organization, setOrganization] = useState("");
  const [selected, setSelected] = useState([]);

  return (
    <LeftSideMenu>
      <div className="flex mt-[3vh]">
        <img src={ucf_logo} className="w-16" />
        <div className="font-bold my-auto ml-5 text-3xl">
          Registered Student Organizations
        </div>
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
                    Organization
                  </th>
                  <th scope="col" className="px-6 py-3 tracking-wide"></th>
                </tr>
              </thead>
              <tbody>
                {orgs.map((o, i) => (
                  <Row key={i} id={o.id} organization={o.organization} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5">
            {selected.length > 0 && (
              <div className="mb-5">
                <div className="font-bold mb-5">
                  Delete {selected.length} Selected
                </div>
                <button
                  className="w-fit bg-red-500 rounded px-3 py-1 hover:opacity-50 text-white mb-5"
                  onClick={() => {
                    if (
                      confirm(
                        `Are you sure you want to delete ${selected.length} organizations?`
                      )
                    ) {
                      setSelected([]);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            )}
            <div className="font-bold mb-5">Add New RSO</div>
            <input
              className="border rounded shadow w-64 px-3 py-1"
              type="text"
              name="organization"
              placeholder="RSO Name"
              onChange={(e) => setOrganization(e.target.value)}
              value={organization}
            />

            <button
              className="w-fit bg-[#ffcc00] rounded px-3 py-1 hover:opacity-50 ml-3"
              onClick={() => console.log("submitted")}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </LeftSideMenu>
  );

  function Row({ id, organization }) {
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
        <td className="px-6 py-4">{organization}</td>
      </tr>
    );
  }
}
