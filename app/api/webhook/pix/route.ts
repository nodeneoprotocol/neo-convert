import { NextResponse } from "next/server";

/**
 * Endpoint legado.
 * O webhook de pagamento oficial está centralizado na FlowPay API.
 */
export async function POST() {
    return NextResponse.json(
        {
            received: true,
            deprecated: true,
            message: "Webhook centralizado na FlowPay API (api.flowpay.cash).",
        },
        { status: 202 }
    );
}

export async function GET() {
    return NextResponse.json(
        {
            ok: true,
            deprecated: true,
            message: "Use o webhook central da FlowPay API.",
        },
        { status: 200 }
    );
}
