'use client'
import React from 'react'
import BookDownloadApp from './BookDownloadApp'
import './style.css'

const page = () => {

  
  return (
    <>
    {/* <!-- Menu Bar --> */}
    <div className="flex items-center border-b border-gray-300 bg-gray-50" pstyle="height: 24px;">
        <div className="px-3 py-1 hover:bg-gray-200 cursor-pointer">File</div>
        <div className="px-3 py-1 hover:bg-gray-200 cursor-pointer">Edit</div>
        <div className="px-3 py-1 hover:bg-gray-200 cursor-pointer">View</div>
        <div className="px-3 py-1 hover:bg-gray-200 cursor-pointer">Options</div>
        <div className="px-3 py-1 hover:bg-gray-200 cursor-pointer">Help</div>
    </div>

    {/* <!-- Toolbar --> */}
    <div className="flex items-center gap-1 px-2 py-2 border-b border-gray-300 bg-gray-50">
        <button className="toolbar-btn" ponClick-data="addTorrent()" title="Add Torrent">
            <i data-lucide="plus" className="w-4 h-4 inline"></i>
        </button>
        <button className="toolbar-btn" ponClick-data="createTorrent()" title="Create Torrent">
            <i data-lucide="file-plus" className="w-4 h-4 inline"></i>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button className="toolbar-btn" ponClick-data="startSelected()" title="Start">
            <i data-lucide="play" className="w-4 h-4 inline icon-green"></i>
        </button>
        <button className="toolbar-btn" ponClick-data="pauseSelected()" title="Pause">
            <i data-lucide="pause" className="w-4 h-4 inline icon-orange"></i>
        </button>
        <button className="toolbar-btn" ponClick-data="stopSelected()" title="Stop">
            <i data-lucide="square" className="w-4 h-4 inline icon-red"></i>
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <button className="toolbar-btn" ponClick-data="removeSelected()" title="Remove">
            <i data-lucide="trash-2" className="w-4 h-4 inline icon-red"></i>
        </button>
        <div className="flex-1"></div>
        <input type="text" placeholder="Search..." className="px-2 py-1 border border-gray-300 rounded text-xs w-48 focus:outline-none focus:border-blue-500"/>
    </div>

    {/* <!-- Main Content Area --> */}
    <div className="flex flex-1 overflow-hidden">
        {/* <!-- Sidebar --> */}
        <div className="sidebar" pstyle="width: 180px;">
            <div className="sidebar-item active" ponClick-data="filterCategory('all')">
                <i data-lucide="layers" className="w-4 h-4 inline mr-2"></i>All (25)
            </div>
            <div className="sidebar-item" ponClick-data="filterCategory('downloading')">
                <i data-lucide="arrow-down" className="w-4 h-4 inline mr-2 icon-green"></i>Downloading (8)
            </div>
            <div className="sidebar-item" ponClick-data="filterCategory('seeding')">
                <i data-lucide="arrow-up" className="w-4 h-4 inline mr-2 icon-blue"></i>Seeding (12)
            </div>
            <div className="sidebar-item" ponClick-data="filterCategory('completed')">
                <i data-lucide="check-circle" className="w-4 h-4 inline mr-2 icon-green"></i>Completed (25)
            </div>
            <div className="sidebar-item" ponClick-data="filterCategory('active')">
                <i data-lucide="activity" className="w-4 h-4 inline mr-2"></i>Active (14)
            </div>
            <div className="sidebar-item" ponClick-data="filterCategory('inactive')">
                <i data-lucide="pause-circle" className="w-4 h-4 inline mr-2"></i>Inactive (11)
            </div>
            <div className="px-3 py-2 font-semibold text-gray-600 text-xs mt-2">LABELS</div>
            <div className="sidebar-item" ponClick-data="filterCategory('books')">
                <i data-lucide="book" className="w-4 h-4 inline mr-2"></i>Books (17)
            </div>
            <div className="sidebar-item" ponClick-data="filterCategory('audiobooks')">
                <i data-lucide="headphones" className="w-4 h-4 inline mr-2"></i>Audiobooks (3)
            </div>
            <div className="sidebar-item" ponClick-data="filterCategory('textbooks')">
                <i data-lucide="graduation-cap" className="w-4 h-4 inline mr-2"></i>Textbooks (5)
            </div>
            <div className="px-3 py-2 font-semibold text-gray-600 text-xs mt-2">TRACKERS</div>
            <div className="sidebar-item" ponClick-data="filterCategory('tracker1')">
                <i data-lucide="radio" className="w-4 h-4 inline mr-2 icon-green"></i>boooks.app (19)
            </div>
            <div className="sidebar-item" ponClick-data="filterCategory('tracker2')">
                <i data-lucide="radio" className="w-4 h-4 inline mr-2 icon-red"></i>t411.me (6)
            </div>
        </div>

        {/* <!-- Main Table Area --> */}
        <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto">
                <table id="torrentTable">
                    <thead>
                        <tr>
                            <th pstyle="width: 30px;"><input type="checkbox" ponClick-data="toggleSelectAll(this)"/></th>
                            <th pstyle="width: 400px;">Name</th>
                            <th pstyle="width: 80px;">Size</th>
                            <th pstyle="width: 80px;">Done</th>
                            <th pstyle="width: 80px;">Status</th>
                            <th pstyle="width: 100px;">Seeds</th>
                            <th pstyle="width: 100px;">Peers</th>
                            <th pstyle="width: 100px;">Down Speed</th>
                            <th pstyle="width: 100px;">Up Speed</th>
                            <th pstyle="width: 80px;">ETA</th>
                            <th pstyle="width: 80px;">Ratio</th>
                            <th pstyle="width: 120px;">Label</th>
                            <th pstyle="width: 100px;">Added On</th>
                            <th pstyle="width: 120px;">Completed On</th>
                        </tr>
                    </thead>
                    <tbody id="torrentTableBody">
                        {/* <!-- Populated by JS --> */}
                    </tbody>
                </table>
            </div>

            {/* <!-- Details Panel --> */}
            <div className="border-t border-gray-300" pstyle="height: 200px;">
                <div className="tab-bar">
                    <div className="tab active" ponClick-data="switchTab('general')">General</div>
                    <div className="tab" ponClick-data="switchTab('trackers')">Trackers</div>
                    <div className="tab" ponClick-data="switchTab('peers')">Peers</div>
                    <div className="tab" ponClick-data="switchTab('files')">Files</div>
                    <div className="tab" ponClick-data="switchTab('speed')">Speed</div>
                    <div className="tab" ponClick-data="switchTab('logger')">Logger</div>
                </div>
                <div id="detailsContent" className="p-3 overflow-auto" pstyle="height: calc(100% - 32px); background: #fff;">
                    <div id="generalTab">
                        <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                                <div className="mb-2"><strong>Transfer</strong></div>
                                <div className="flex justify-between mb-1">
                                    <span>Time Elapsed:</span>
                                    <span id="timeElapsed">-</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span>Downloaded:</span>
                                    <span id="downloaded">-</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span>Uploaded:</span>
                                    <span id="uploaded">-</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span>Seeds:</span>
                                    <span id="seedsDetail">-</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span>Peers:</span>
                                    <span id="peersDetail">-</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span>Download Speed:</span>
                                    <span id="downSpeedDetail" className="icon-green font-semibold">-</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span>Upload Speed:</span>
                                    <span id="upSpeedDetail" className="icon-blue font-semibold">-</span>
                                </div>
                            </div>
                            <div>
                                <div className="mb-2"><strong>General</strong></div>
                                <div className="flex justify-between mb-1">
                                    <span>Save As:</span>
                                    <span id="savePath" className="text-blue-600 cursor-pointer">-</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span>Hash:</span>
                                    <span id="hash" className="font-mono text-xs">-</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span>Pieces:</span>
                                    <span id="pieces">-</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span>Created On:</span>
                                    <span id="createdOn">-</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span>Added On:</span>
                                    <span id="addedOn">-</span>
                                </div>
                                <div className="flex justify-between mb-1">
                                    <span>Completed On:</span>
                                    <span id="completedOn">-</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="peersTab" className="hidden">
                        <table className="w-full text-xs">
                            <thead>
                                <tr>
                                    <th className="text-left py-1">IP</th>
                                    <th className="text-left py-1">Country</th>
                                    <th className="text-left py-1">Client</th>
                                    <th className="text-right py-1">Down Speed</th>
                                    <th className="text-right py-1">Up Speed</th>
                                    <th className="text-right py-1">Progress</th>
                                </tr>
                            </thead>
                            <tbody id="peersTableBody">
                                {/* <!-- Populated by JS --> */}
                            </tbody>
                        </table>
                    </div>
                    <div id="speedTab" className="hidden">
                        <div className="mb-2 text-xs font-semibold">Download Speed Graph</div>
                        <div id="downloadGraph" className="speed-graph mb-4"></div>
                        <div className="mb-2 text-xs font-semibold">Upload Speed Graph</div>
                        <div id="uploadGraph" className="speed-graph"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <!-- Status Bar --> */}
    <div className="status-bar flex items-center gap-4">
        <div className="flex items-center gap-2">
            <i data-lucide="arrow-down" className="w-3 h-3 icon-green"></i>
            <span id="statusDownSpeed">0 KB/s</span>
        </div>
        <div className="flex items-center gap-2">
            <i data-lucide="arrow-up" className="w-3 h-3 icon-blue"></i>
            <span id="statusUpSpeed">0 KB/s</span>
        </div>
        <div className="w-px h-4 bg-gray-400"></div>
        <span>DHT: <strong id="dhtNodes">0</strong> nodes</span>
        <div className="flex-1"></div>
        <span>Boooks v3.3</span>
    </div>

    
    {/* <BookDownloadApp/> */}
    </>
  )
}

export default page