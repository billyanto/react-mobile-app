import qrImg from '../../assets/scan-qr-code.png'
import Splash from '../../common/components/Spalsh/index.tsx'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import './style.css'
import React from 'react'
interface IntroProps {
    readonly cookiesData?: any
}
interface UserData {
    id: number
    first_name: string
    last_name?: string
    username?: string
    language_code: string
    is_premium?: boolean
}

function Intro({ cookiesData }: IntroProps) {
    const [cookies, setCookie] = useCookies(['userToken', 'userData'])
    const [userData, setUserData] = useState<UserData | null>(null)
    const [showSplash, setShowSplash] = useState(true)

    useEffect(() => {
        if (cookiesData) {
            setCookie('userData', cookiesData)
        } else {
            setCookie('userData', null)
        }
    }, [cookiesData])

    useEffect(() => {
        if (userData) {
            sendRequest(userData.id)
        }
    }, [userData])

    useEffect(() => {
        // Hide splash screen after 2 seconds
        const timer = setTimeout(() => setShowSplash(false), 2000)
        return () => clearTimeout(timer)
    }, [])
    useEffect(() => {
        // Hide splash screen after 2 seconds
        const timer = setTimeout(() => setShowSplash(false), 2000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        // Hide splash screen after 2 seconds
        console.log('cookies', cookies.userToken)
        if (cookies.userToken) {
            getUserAppAccount()
        }
    }, [cookies.userToken])

    const sendRequest = async (idTelegram: number) => {
        try {
            const apiUrl = process.env.VITE_APP_API_URL;
            const res = await fetch(`${apiUrl}/api/v1/auth/user-app/signin`, {
                method: 'POST', // Use the appropriate HTTP method
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: encodeString(String(idTelegram)),
                }),
            })

            if (!res.ok) {
                console.log('error', res)
            }

            const responseData = await res.json()

            setCookie('userToken', responseData.data.token)
        } catch (err) {
            console.log('error', err)
        }
    }

    const getUserAppAccount = async () => {
        if (cookies.userToken) {
            try {
                const apiUrl = process.env.VITE_APP_API_URL;
                const res = await fetch(
                    `${apiUrl}/api/v1/user-app/profile/my-account`,
                    {
                        method: 'GET', // Use the appropriate HTTP method
                        headers: {
                            'Content-Type': 'application/json',
                            token: 'APP ' + cookies.userToken,
                        },
                    }
                )

                if (!res.ok) {
                    console.log('error', res)
                }

                const responseData = await res.json()
                setCookie('userToken', responseData.token)
            } catch (err) {
                console.log('error', err)
            } finally {
                // setLoading(false)
            }
        }
    }

    function encodeString(data: string) {
        return Buffer.from(data).toString('base64')
    }
    return (
        <>
            {showSplash && <Splash />}

            <div className="bgColor">
                <div className="d-flex w-100">
                    <Link
                        data-testid="testCloseButton"
                        className="text-white ml-auto mt-2 mr-4"
                        to="/home"
                    >
                        Close
                    </Link>
                </div>

                <div className="sonar-wrapper">
                    <div className="sonar-emitter">
                        <img alt="" className="qr-scann" src={qrImg}></img>
                        <div className="sonar-wave sonar-wave1"></div>
                        <div className="sonar-wave sonar-wave2"></div>
                        <div className="sonar-wave sonar-wave3"></div>
                        <div className="sonar-wave sonar-wave4"></div>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <span className="text-center text-white heading1">
                        <strong>Let’s Trace your product</strong>
                    </span>
                    <span className="text-center text-white mt-1 heading2">
                        Scan QR Code on the back of the bag
                    </span>
                </div>

                <div className="text-center intro-scan-qr w-100">
                    <Link
                        data-testid="testScanTheQrCodeButton"
                        className="pointer btn bg-white text-success w-75 mx-auto pt-2 pb-2 pl-4 pr-4 mb-2"
                        to="/batch-code/scan-qr"
                    >
                        <strong>Scan the QR Code</strong>
                    </Link>
                    {!cookies.userData?.role_id && (
                        <div className="text-white mb-2">
                            Want to assign traceability but
                            <br /> don't have an account?{' '}
                            <Link
                                data-testid="testRegisterButton"
                                className="text-white"
                                to="/signup"
                            >
                                <u>Join now</u>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Intro
