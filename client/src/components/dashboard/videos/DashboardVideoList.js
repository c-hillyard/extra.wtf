import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFiles, deleteFile } from '../../../actions/file';
import { FaIcon } from '../../../container/atoms/FaIcon';

const DashboardVideoList = ({ getFiles, deleteFile, files }) => {
  useEffect(() => {
    getFiles();
  }, [getFiles]);

  return (
    <div className="p-3 bg-gray-100 rounded-lg flex flex-col">
      <h2 className="text-xl font-medium mb-4">File List</h2>

      <div className="flex items-center justify-end mb-4">
        <Link
          to="/dashboard/files/create"
          className="py-2 px-3 rounded bg-lime-900 text-white"
        >
          Create A File
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Path</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {files.map((file, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="py-3 px-6 text-left">{file.type}</td>
                <td className="py-3 px-6 text-left font-medium">
                  {file.name}
                </td>
                <td className="py-3 px-6 text-left">{file.path}</td>
                <td className="py-3 px-6 text-left">
                  <Link
                    to={`/dashboard/files/edit/${file._id}`}
                    className="py-2 px-3 rounded bg-teal-800 text-white mx-1"
                  >
                    <FaIcon iconName="fa fa-edit" />
                  </Link>
                  <button
                    className="py-2 px-3 rounded bg-orange-700 text-white mx-1"
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to delete this file? If you delete this file, the files in the directory are permanently deleted.'
                        )
                      )
                        deleteFile(file._id);
                    }}
                  >
                    <FaIcon iconName="fa fa-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

DashboardVideoList.propTypes = {
  getFiles: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  files: state.file.files
});

export default connect(mapStateToProps, { getFiles, deleteFile })(
  DashboardVideoList
);
