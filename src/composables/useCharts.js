// ===========================================
// Weather Dashboard - Charts Management
// ===========================================

const { nextTick, onUnmounted } = Vue;

/**
 * チャート管理を提供するComposable
 * @param {Object} state - アプリケーションの状態
 * @param {Object} utils - ユーティリティ関数
 * @returns {Object} チャート関連の関数
 */
const useCharts = (state, utils) => {
    if (!state || !utils) {
        throw new Error('useCharts requires state and utils parameters');
    }

    /**
     * 気圧チャートを更新
     * @param {Object} weatherData - 天気データ
     */
    const updatePressureChart = (weatherData) => {
        try {
            // より長い遅延でDOM要素の準備を確実に待つ
            setTimeout(() => {
                const canvas = document.getElementById('pressureChart');
                if (!canvas) {
                    console.warn('Pressure chart canvas not found');
                    return;
                }

                if (!weatherData?.hourly?.pressure_msl) {
                    console.warn('Pressure data not available');
                    return;
                }

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    console.warn('Canvas context not available');
                    return;
                }

                // 既存のチャートを破棄
                if (state.pressureChart) {
                    state.pressureChart.destroy();
                    state.pressureChart = null;
                }

                // データ準備（現在時刻の次の時刻から12時間）
                const labels = [];
                const pressureData = [];
                
                try {
                    // 現在時刻の次の時刻を取得
                    const nextHourTime = utils.safeGetNextHourTime();
                    
                    // 12時間分のデータを抽出
                    const filteredData = utils.safeFilterHourlyDataFromTime(weatherData.hourly, nextHourTime, 12);
                    
                    const maxPoints = Math.min(12, filteredData.time ? filteredData.time.length : 0);
                    for (let i = 0; i < maxPoints; i++) {
                        if (filteredData.time && filteredData.time[i] && filteredData.pressure_msl && filteredData.pressure_msl[i]) {
                            const time = new Date(filteredData.time[i]).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
                            labels.push(time);
                            pressureData.push(filteredData.pressure_msl[i]);
                        }
                    }
                } catch (error) {
                    console.warn('Pressure chart data filtering error:', error);
                    // フォールバック：従来の方法
                    const maxPoints = 12;
                    for (let i = 0; i < Math.min(maxPoints, weatherData.hourly.time.length); i++) {
                        if (weatherData.hourly.time[i] && weatherData.hourly.pressure_msl[i]) {
                            const time = new Date(weatherData.hourly.time[i]).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
                            labels.push(time);
                            pressureData.push(weatherData.hourly.pressure_msl[i]);
                        }
                    }
                }

                if (labels.length === 0) {
                    console.warn('No pressure data to display');
                    return;
                }

                state.pressureChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: '気圧 (hPa)',
                            data: pressureData,
                            borderColor: '#6366f1',
                            backgroundColor: 'rgba(99, 102, 241, 0.1)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4,
                            pointRadius: 3,
                            pointHoverRadius: 5
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: {
                            intersect: false,
                            mode: 'index'
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                titleColor: 'white',
                                bodyColor: 'white',
                                cornerRadius: 8
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: false,
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.1)'
                                },
                                ticks: {
                                    color: '#6b7280',
                                    font: {
                                        size: 10
                                    }
                                }
                            },
                            x: {
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.1)'
                                },
                                ticks: {
                                    color: '#6b7280',
                                    font: {
                                        size: 10
                                    },
                                    maxRotation: 0
                                }
                            }
                        }
                    }
                });
            }, 300); // 300ms遅延
        } catch (error) {
            console.error('Pressure chart error:', error);
        }
    };

    /**
     * 降水量チャートを更新
     * @param {Object} weatherData - 天気データ
     */
    const updatePrecipitationChart = (weatherData) => {
        try {
            setTimeout(() => {
                const canvas = document.getElementById('precipitationChart');
                if (!canvas) {
                    console.warn('Precipitation chart canvas not found');
                    return;
                }

                if (!weatherData?.hourly?.precipitation) {
                    console.warn('Precipitation data not available');
                    return;
                }

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    console.warn('Canvas context not available');
                    return;
                }

                // 既存のチャートを破棄
                if (state.precipitationChart) {
                    state.precipitationChart.destroy();
                    state.precipitationChart = null;
                }

                // データ準備（現在時刻の次の時刻から12時間）
                const labels = [];
                const precipitationData = [];
                
                try {
                    // 現在時刻の次の時刻を取得
                    const nextHourTime = utils.safeGetNextHourTime();
                    
                    // 12時間分のデータを抽出
                    const filteredData = utils.safeFilterHourlyDataFromTime(weatherData.hourly, nextHourTime, 12);
                    
                    const maxPoints = Math.min(12, filteredData.time ? filteredData.time.length : 0);
                    for (let i = 0; i < maxPoints; i++) {
                        if (filteredData.time && filteredData.time[i]) {
                            const time = new Date(filteredData.time[i]).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
                            labels.push(time);
                            precipitationData.push((filteredData.precipitation && filteredData.precipitation[i]) ? filteredData.precipitation[i] : 0);
                        }
                    }
                } catch (error) {
                    console.warn('Precipitation chart data filtering error:', error);
                    // フォールバック：従来の方法
                    const maxPoints = 12;
                    for (let i = 0; i < Math.min(maxPoints, weatherData.hourly.time.length); i++) {
                        if (weatherData.hourly.time[i]) {
                            const time = new Date(weatherData.hourly.time[i]).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
                            labels.push(time);
                            precipitationData.push(weatherData.hourly.precipitation[i] || 0);
                        }
                    }
                }

                state.precipitationChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: '降水量 (mm)',
                            data: precipitationData,
                            backgroundColor: '#3b82f6',
                            borderColor: '#1d4ed8',
                            borderWidth: 1,
                            borderRadius: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: {
                            intersect: false,
                            mode: 'index'
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                titleColor: 'white',
                                bodyColor: 'white',
                                cornerRadius: 8
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.1)'
                                },
                                ticks: {
                                    color: '#6b7280',
                                    font: {
                                        size: 10
                                    }
                                }
                            },
                            x: {
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.1)'
                                },
                                ticks: {
                                    color: '#6b7280',
                                    font: {
                                        size: 10
                                    },
                                    maxRotation: 0
                                }
                            }
                        }
                    }
                });
            }, 300); // 300ms遅延
        } catch (error) {
            console.error('Precipitation chart error:', error);
        }
    };

    /**
     * 両方のチャートを更新
     * @param {Object} weatherData - 天気データ
     */
    const updateCharts = (weatherData) => {
        nextTick(() => {
            updatePressureChart(weatherData);
            updatePrecipitationChart(weatherData);
        });
    };

    /**
     * リサイズハンドラー
     */
    const handleResize = () => {
        try {
            if (state.pressureChart) {
                state.pressureChart.resize();
            }
            if (state.precipitationChart) {
                state.precipitationChart.resize();
            }
        } catch (error) {
            console.warn('Chart resize error:', error);
        }
    };

    /**
     * チャートのクリーンアップ
     */
    const cleanupCharts = () => {
        try {
            if (state.pressureChart) {
                state.pressureChart.destroy();
                state.pressureChart = null;
            }
            if (state.precipitationChart) {
                state.precipitationChart.destroy();
                state.precipitationChart = null;
            }
        } catch (error) {
            console.warn('Chart cleanup error:', error);
        }
    };

    // コンポーネントがアンマウントされた時の清理
    onUnmounted(() => {
        cleanupCharts();
    });

    return {
        updatePressureChart,
        updatePrecipitationChart,
        updateCharts,
        handleResize,
        cleanupCharts
    };
};
