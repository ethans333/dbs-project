import LeftSideMenu from "../Components/LeftSideMenu";
import ucf_logo from "../assets/ucf_logo.png";

export default function () {
  return (
    <LeftSideMenu>
      <div className="flex mt-[3vh]">
        <img src={ucf_logo} className="w-16" />
        <div className="font-bold my-auto ml-5 text-3xl">
          Registered Student Organizations
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mt-[10vh] overflow-y-scroll max-h-[80vh] p-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3 tracking-wide"></th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 tracking-wide"
                  >
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date Registered
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 tracking-wide"
                  >
                    Last Contacted
                  </th>
                  <th scope="col" className="px-6 py-3 tracking-wide">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 tracking-wide"></th>
                </tr>
              </thead>
              <tbody>
                {/* {numbers.map((number, i) => (
                  <Row key={i} {...number} />
                ))} */}
                <Row />
                <Row />
                <Row />
                <Row />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LeftSideMenu>
  );
}

function Row() {
  return (
    <tr>
      <td className="px-6 py-4">X</td>
      <td className="px-6 py-4 bg-gray-50">Ipsum</td>
      <td className="px-6 py-4">Lorem</td>
      <td className="px-6 py-4 bg-gray-50">Ipsum</td>
      <td className="px-6 py-4">Lorem</td>
      <td className="px-6 py-4">X</td>
    </tr>
  );
}
